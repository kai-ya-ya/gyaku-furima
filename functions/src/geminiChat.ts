import { onCall, HttpsError } from "firebase-functions/v2/https";
import { GoogleGenAI, FunctionCallingConfigMode } from "@google/genai";
import { logger } from "firebase-functions";
import { defineString } from "firebase-functions/params";

import * as admin from "firebase-admin";
import { f, p } from "./res";

if (admin.apps.length === 0) {
  admin.initializeApp();
}
const geminiApiKey = defineString("GEMINI_API_KEY");
const ai = new GoogleGenAI({ apiKey: geminiApiKey.value() });
const db = admin.firestore();

interface SellInfo {
  name?: string | null;
  desc?: string | null;
  level?: number | null;
}

interface ChatContext {
  sellInfo?: SellInfo;
  userNotes?: { [key: string]: any };
  chatHistory?: any[];
}

interface UpdateProductInfoArgs {
  sellInfo?: SellInfo;
  userNotes?: { [key: string]: any };
}

async function loadChatContext(userid: string): Promise<ChatContext> {
  const userRef = db.collection("users").doc(userid);
  const doc = await userRef.get();

  if (!doc.exists) {
    return {
      sellInfo: { name: null, desc: null, level: null },
      userNotes: {},
      chatHistory: [],
    };
  }
  return doc.data() as ChatContext;
}

async function saveChatState(
  userId: string,
  context: Partial<ChatContext>,
): Promise<void> {
  const userRef = db.collection("users").doc(userId);
  await userRef.set(context, { merge: true });
}

export const geminiChat = onCall(async (request) => {
  const userid = request.auth?.uid;
  if (!userid) {
    throw new HttpsError(
      "unauthenticated",
      "The function must be called while authenticated.",
    );
  }

  try {
    const context = await loadChatContext(userid);
    const currentStateString = JSON.stringify(
      {
        sellInfo: context.sellInfo,
        userNotes: context.userNotes,
      },
      null,
      2,
    );
    const userMessage = request.data.message;
    const contents = [
      ...(context.chatHistory ?? []),
      { role: "user", parts: [{ text: userMessage }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: `${p["gyaku-furima_bot"].instruction}${currentStateString}`,
        tools: [
          {
            functionDeclarations: [f.updateProductInfo, f.proposeFinalProduct],
          },
        ],
        toolConfig: {
          functionCallingConfig: {
            mode: FunctionCallingConfigMode.ANY,
          },
        },
      },
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];
      const updatedContext = { ...context };

      const historyWithFunctionCall = [
        ...contents,
        {
          role: "model",
          parts: [{ functionCall: { name: call.name, args: call.args } }],
        },
      ];
      updatedContext.chatHistory = historyWithFunctionCall;

      if (call.name === "updateProductInfo") {
        const { sellInfo, userNotes } = call.args as UpdateProductInfoArgs;

        if (sellInfo) {
          updatedContext.sellInfo = { ...updatedContext.sellInfo, ...sellInfo };
        }
        if (userNotes) {
          updatedContext.userNotes = {
            ...updatedContext.userNotes,
            ...userNotes,
          };
        }

        await saveChatState(userid, updatedContext);

        const followUpContents = [
          ...historyWithFunctionCall,
          {
            role: "function",
            parts: [
              {
                functionResponse: {
                  name: "updateProductInfo",
                  response: {
                    success: true,
                    message: "商品情報を更新しました。",
                  },
                },
              },
            ],
          },
        ];

        // 2. 実行結果を踏まえて、再度AIに応答を生成させる
        const followUpResult = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: followUpContents,
          config: {
            systemInstruction: `${p["gyaku-furima_bot"].instruction}${JSON.stringify(updatedContext, null, 2)}`,
          },
        });

        const followUpText = followUpResult.text ?? "";
        const finalHistory = [
          ...followUpContents,
          { role: "model", parts: [{ text: followUpText }] },
        ];

        await saveChatState(userid, { chatHistory: finalHistory });

        // 3. 最終的な自然言語の応答をクライアントに返す
        return { type: "text", message: followUpText };
      }

      if (call.name === "proposeFinalProduct") {
        const { finalSellInfo } = call.args as { finalSellInfo: SellInfo };
        updatedContext.sellInfo = finalSellInfo;

        await saveChatState(userid, updatedContext);

        const followUpContents = [
          ...historyWithFunctionCall,
          {
            role: "function",
            parts: [
              {
                functionResponse: {
                  name: "proposeFinalProduct",
                  response: { success: true, data: finalSellInfo },
                },
              },
            ],
          },
        ];

        // 2. 実行結果を踏まえて、再度AIに応答を生成させる
        const followUpResult = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: followUpContents,
          config: {
            systemInstruction: `${p["gyaku-furima_bot"].instruction}${JSON.stringify(updatedContext, null, 2)}`,
          },
        });

        const proposalText = followUpResult.text ?? "";
        const finalHistory = [
          ...followUpContents,
          { role: "model", parts: [{ text: proposalText }] },
        ];

        await saveChatState(userid, { chatHistory: finalHistory });

        // 3. AIが生成した最終的な提案メッセージをクライアントに返す
        return { type: "sell", message: proposalText, sellInfo: finalSellInfo };
      }
    } else {
      const modelResponseText = response.text ?? "";
      const updatedHistory = [
        ...contents,
        { role: "model", parts: [{ text: modelResponseText }] },
      ];

      await saveChatState(userid, { chatHistory: updatedHistory });

      return { type: "text", message: modelResponseText };
    }
  } catch (error) {
    logger.error("Error in chatEndpoint:", error);
    throw new HttpsError("internal", "An internal error occurred.");
  }

  // フォールバックの戻り値
  return { type: "error", message: "An unexpected error occurred." };
});

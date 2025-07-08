"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiChat = void 0;
const https_1 = require("firebase-functions/v2/https");
const genai_1 = require("@google/genai");
const firebase_functions_1 = require("firebase-functions");
const params_1 = require("firebase-functions/params");
const admin = __importStar(require("firebase-admin"));
const res_1 = require("./res");
if (admin.apps.length === 0) {
    admin.initializeApp();
}
const geminiApiKey = (0, params_1.defineString)("GEMINI_API_KEY");
const ai = new genai_1.GoogleGenAI({ apiKey: geminiApiKey.value() });
const db = admin.firestore();
async function loadChatContext(userid) {
    const userRef = db.collection("users").doc(userid);
    const doc = await userRef.get();
    if (!doc.exists) {
        return {
            sellInfo: { name: null, desc: null, level: null },
            userNotes: {},
            chatHistory: [],
        };
    }
    return doc.data();
}
async function saveChatState(userId, context) {
    const userRef = db.collection("users").doc(userId);
    await userRef.set(context, { merge: true });
}
exports.geminiChat = (0, https_1.onCall)(async (request) => {
    var _a, _b, _c, _d, _e;
    const userid = (_a = request.auth) === null || _a === void 0 ? void 0 : _a.uid;
    if (!userid) {
        throw new https_1.HttpsError("unauthenticated", "The function must be called while authenticated.");
    }
    try {
        const context = await loadChatContext(userid);
        const currentStateString = JSON.stringify({
            sellInfo: context.sellInfo,
            userNotes: context.userNotes,
        }, null, 2);
        const userMessage = request.data.message;
        const contents = [
            ...((_b = context.chatHistory) !== null && _b !== void 0 ? _b : []),
            { role: "user", parts: [{ text: userMessage }] },
        ];
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: `${res_1.p["gyaku-furima_bot"].instruction}${currentStateString}`,
                tools: [
                    {
                        functionDeclarations: [res_1.f.updateProductInfo, res_1.f.proposeFinalProduct],
                    },
                ],
                toolConfig: {
                    functionCallingConfig: {
                        mode: genai_1.FunctionCallingConfigMode.ANY,
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
                const { sellInfo, userNotes } = call.args;
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
                        systemInstruction: `${res_1.p["gyaku-furima_bot"].instruction}${JSON.stringify(updatedContext, null, 2)}`,
                    },
                });
                const followUpText = (_c = followUpResult.text) !== null && _c !== void 0 ? _c : "";
                const finalHistory = [
                    ...followUpContents,
                    { role: "model", parts: [{ text: followUpText }] },
                ];
                await saveChatState(userid, { chatHistory: finalHistory });
                // 3. 最終的な自然言語の応答をクライアントに返す
                return { type: "text", message: followUpText };
            }
            if (call.name === "proposeFinalProduct") {
                const { finalSellInfo } = call.args;
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
                        systemInstruction: `${res_1.p["gyaku-furima_bot"].instruction}${JSON.stringify(updatedContext, null, 2)}`,
                    },
                });
                const proposalText = (_d = followUpResult.text) !== null && _d !== void 0 ? _d : "";
                const finalHistory = [
                    ...followUpContents,
                    { role: "model", parts: [{ text: proposalText }] },
                ];
                await saveChatState(userid, { chatHistory: finalHistory });
                // 3. AIが生成した最終的な提案メッセージをクライアントに返す
                return { type: "sell", message: proposalText, sellInfo: finalSellInfo };
            }
        }
        else {
            const modelResponseText = (_e = response.text) !== null && _e !== void 0 ? _e : "";
            const updatedHistory = [
                ...contents,
                { role: "model", parts: [{ text: modelResponseText }] },
            ];
            await saveChatState(userid, { chatHistory: updatedHistory });
            return { type: "text", message: modelResponseText };
        }
    }
    catch (error) {
        firebase_functions_1.logger.error("Error in chatEndpoint:", error);
        throw new https_1.HttpsError("internal", "An internal error occurred.");
    }
    // フォールバックの戻り値
    return { type: "error", message: "An unexpected error occurred." };
});
//# sourceMappingURL=geminiChat.js.map
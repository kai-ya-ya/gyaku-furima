import { onCall, HttpsError } from "firebase-functions/v2/https";
import { GoogleGenAI, Type } from "@google/genai";
import { defineString } from "firebase-functions/params";

const geminiApiKey = defineString("GEMINI_API_KEY");
const ai = new GoogleGenAI({ apiKey: geminiApiKey.value() });

const ConceptType = {
  DOMAIN: "domain",
  NEEDS: "needs",
  SEEDS: "seeds",
  PERSONA: "persona",
  CONTEXT: "context",
  IDEA: "idea",
  USE_CASE: "use_case",
  SCENARIO: "scenario",
  FUNCTION: "function",
  PRODUCT: "product",
  CUSTOMER_JOURNEY: "customer_journey",
} as const;

const Item = {
  type: Type.OBJECT,
  conceptType: {
    type: Type.STRING,
    enum: Object.values(ConceptType),
  },
  name: {
    type: Type.STRING,
  },
  desc: {
    type: Type.STRING,
  },
};

const ConceptModel = {
  type: Type.OBJECT,
  domains: {
    type: Type.ARRAY,
    items: Item,
  },
  needs: {
    type: Type.ARRAY,
    items: Item,
  },
  personas: {
    type: Type.ARRAY,
    items: Item,
  },
  contexts: {
    type: Type.ARRAY,
    items: Item,
  },
  seeds: {
    type: Type.ARRAY,
    items: Item,
  },
  ideas: {
    type: Type.ARRAY,
    items: Item,
  },
  use_cases: {
    type: Type.ARRAY,
    items: Item,
  },
  scenarios: {
    type: Type.ARRAY,
    items: Item,
  },
  functions: {
    type: Type.ARRAY,
    items: Item,
  },
  products: {
    type: Type.ARRAY,
    items: Item,
  },
  customer_journeys: {
    type: Type.ARRAY,
    items: Item,
  },
};

export const fillModel = onCall(async (request) => {
  const conceptModel = request.data.conceptModel;
  const jsonString: string = JSON.stringify(conceptModel, null, 2);
  const prompt = `
    - 与えられたプロダクト開発モデルから残りの要素を補完してください。
    - **他のテキストや説明は一切含めないでください。**

    ---

    ${jsonString}
    `;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          // ここを修正
          conceptModel: ConceptModel, // ここを修正
        },
      },
    },
  });
  try {
    const candidates = response.candidates;
    if (!candidates || !Array.isArray(candidates) || candidates.length === 0) {
      throw new HttpsError("internal", "Gemini response has no candidates.");
    }
    const content = candidates[0]?.content;
    if (
      !content ||
      !Array.isArray(content.parts) ||
      content.parts.length === 0
    ) {
      throw new HttpsError(
        "internal",
        "Gemini candidate has no content parts.",
      );
    }
    const genContent = content.parts[0];
    if (genContent && genContent.text) {
      return JSON.parse(genContent.text);
    } else if (
      genContent &&
      genContent.functionCall &&
      genContent.functionCall.args
    ) {
      return genContent.functionCall.args.conceptModel;
    } else {
      throw new HttpsError("internal", "Gemini response format is unexpected.");
    }
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new HttpsError(
      "internal",
      "Failed to process Gemini response.",
      error,
    );
  }
});

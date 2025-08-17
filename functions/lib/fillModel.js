"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillModel = void 0;
const https_1 = require("firebase-functions/v2/https");
const genai_1 = require("@google/genai");
const params_1 = require("firebase-functions/params");
const geminiApiKey = (0, params_1.defineString)("GEMINI_API_KEY");
const ai = new genai_1.GoogleGenAI({ apiKey: geminiApiKey.value() });
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
};
const Item = {
    type: genai_1.Type.OBJECT,
    conceptType: {
        type: genai_1.Type.STRING,
        enum: Object.values(ConceptType),
    },
    name: {
        type: genai_1.Type.STRING,
    },
    desc: {
        type: genai_1.Type.STRING,
    },
};
const ConceptModel = {
    type: genai_1.Type.OBJECT,
    domains: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    needs: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    personas: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    contexts: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    seeds: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    ideas: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    use_cases: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    scenarios: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    functions: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    products: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
    customer_journeys: {
        type: genai_1.Type.ARRAY,
        items: Item,
    },
};
exports.fillModel = (0, https_1.onCall)(async (request) => {
    var _a;
    const conceptModel = request.data.conceptModel;
    const jsonString = JSON.stringify(conceptModel, null, 2);
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
                type: genai_1.Type.OBJECT,
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
            throw new https_1.HttpsError("internal", "Gemini response has no candidates.");
        }
        const content = (_a = candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
        if (!content ||
            !Array.isArray(content.parts) ||
            content.parts.length === 0) {
            throw new https_1.HttpsError("internal", "Gemini candidate has no content parts.");
        }
        const genContent = content.parts[0];
        if (genContent && genContent.text) {
            return JSON.parse(genContent.text);
        }
        else if (genContent &&
            genContent.functionCall &&
            genContent.functionCall.args) {
            return genContent.functionCall.args.conceptModel;
        }
        else {
            throw new https_1.HttpsError("internal", "Gemini response format is unexpected.");
        }
    }
    catch (error) {
        console.error("Error parsing Gemini response:", error);
        throw new https_1.HttpsError("internal", "Failed to process Gemini response.", error);
    }
});
//# sourceMappingURL=fillModel.js.map
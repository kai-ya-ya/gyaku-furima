import { Type } from "@google/genai";

const _ = {
  updateProductInfo: {
    name: "updateProductInfo",
    description:
      "ユーザーの発言に基づいて、出品情報やメモを更新する。まだ情報が不十分な場合に使用する。",
    parameters: {
      type: Type.OBJECT,
      properties: {
        sellInfo: {
          type: Type.OBJECT,
          description: `
            - 更新する出品情報。更新しない項目は含めない。
            - **ニーズレベル**はユーザーのニーズがどれだけ明確化されているかを示す分類である。

            |ニーズレベル|説明|
            |:--|:--|
            |1|不満を抱えているが自身のニーズを言語化できない|
            |2|自身のニーズを理解し説明できる|
            |3|ニーズを満たす商品の機能の一部を説明できる|`,
          properties: {
            name: { type: Type.STRING, description: "架空の商品名" },
            desc: { type: Type.STRING, description: "商品の説明" },
            level: { type: Type.NUMBER, description: "ニーズレベル (1~4)" },
          },
        },
        userNotes: {
          type: Type.ARRAY,
          description: "ユーザーに関する新たな永続的メモ",
          items: { type: Type.STRING },
        },
      },
    },
  },
  proposeFinalProduct: {
    name: "proposeFinalProduct",
    description:
      "出品情報がすべて揃い、ユーザーに最終提案を行う場合に使用する。",
    parameters: {
      type: Type.OBJECT,
      properties: {
        finalSellInfo: {
          type: Type.OBJECT,
          description: "完成した最終的な出品情報",
          properties: {
            name: { type: Type.STRING },
            desc: { type: Type.STRING },
            level: { type: Type.NUMBER },
          },
          required: ["name", "desc", "level"],
        },
      },
    },
  },
};
export default _;

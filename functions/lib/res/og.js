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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.og = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
admin.initializeApp();
const db = admin.firestore();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
// /og/:id に対応
app.get("*", async (req, res) => {
    const pathParts = req.path.split("/");
    const termId = pathParts[pathParts.length - 1];
    if (!termId) {
        res.status(400).send("Missing ID");
        return;
    }
    try {
        // Firestoreからデータ取得
        const docRef = db.collection("items").doc(termId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            res.status(404).send("Not found");
            return;
        }
        const data = docSnap.data();
        const title = encodeURIComponent(data.itemInfo.desc);
        const typeName = data.itemInfo.type;
        // ✅ ダミー画像URL
        const imageUrl = `https://dummyimage.com/640x640/000/fff&text=${title}`;
        const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.itemInfo.desc}">
  <meta name="twitter:description" content="これは ${typeName} の定義です">
  <meta name="twitter:image" content="${imageUrl}">
  <meta http-equiv="refresh" content="0; url=https://your-domain.com/term?id=${termId}" />
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
    `.trim();
        res.status(200).set("Content-Type", "text/html").send(html);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
exports.og = functions.https.onRequest(app);
//# sourceMappingURL=og.js.map
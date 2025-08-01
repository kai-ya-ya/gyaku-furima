import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

// /og/:id に対応
app.get("*", async (req: express.Request, res: express.Response) => {
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

    type Term = {
      itemInfo: {
        desc: string;
        type: string;
      };
      uploadInfo: {
        userId: string;
        createdAt: string;
      };
    };

    const data = docSnap.data() as Term;
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
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export const og = functions.https.onRequest(app);

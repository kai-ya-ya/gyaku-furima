import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

app.get("*", async (req: express.Request, res: express.Response) => {
  const pathParts = req.path.split("/");
  const termId = pathParts[pathParts.length - 1];

  if (!termId) {
    res.status(400).send("Missing ID");
    return;
  }

  try {
    const docRef = db.collection("items").doc(termId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      res.status(404).send("Not found");
      return;
    }

    const data = docSnap.data() as {
      itemInfo?: {
        desc?: string;
        type?: string;
      };
    };

    const title = data.itemInfo?.desc ?? "定義";
    const typeName = data.itemInfo?.type ?? "";
    const imageUrl = `https://gyaku-furima.web.app/images/og/${termId}.png`;

    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="これは ${typeName} の定義です">
  <meta name="twitter:image" content="${imageUrl}">
  <meta http-equiv="refresh" content="0; url=https://gyaku-furima.web.app/term?id=${termId}" />
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

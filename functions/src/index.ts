// functions/src/index.ts
import {
  onDocumentCreated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
import admin from "firebase-admin"; // Admin SDK
import { DocumentSnapshot } from "firebase-functions/v2/firestore";

admin.initializeApp();

export const incrementLikeCount = onDocumentCreated(
  "likes/{likeId}",
  async (event) => {
    const snap = event.data as DocumentSnapshot;

    const data = snap.data();
    if (!data) {
      console.error("Document data is undefined for onCreate trigger.");
      return;
    }
    const itemId = data.itemId;

    const itemRef = admin.firestore().collection("items").doc(itemId);

    try {
      await itemRef.update({
        likeCount: admin.firestore.FieldValue.increment(1),
      });
      console.log(`Item ${itemId} likeCount incremented.`);
    } catch (error) {
      console.error(`Error incrementing likeCount for item ${itemId}:`, error);
      if (
        error instanceof Error &&
        error.message.includes("no document to update")
      ) {
        await itemRef.set({ likeCount: 1 }, { merge: true });
        console.log(`Item ${itemId} likeCount initialized to 1.`);
      }
    }
  },
);

export const decrementLikeCount = onDocumentDeleted(
  "likes/{likeId}",
  async (event) => {
    const snap = event.data as DocumentSnapshot;

    const data = snap.data();
    if (!data) {
      console.error("Document data is undefined for onDelete trigger.");
      return;
    }
    const itemId = data.itemId;

    const itemRef = admin.firestore().collection("items").doc(itemId);

    try {
      await itemRef.update({
        likeCount: admin.firestore.FieldValue.increment(-1),
      });
      console.log(`Item ${itemId} likeCount decremented.`);
    } catch (error) {
      console.error(`Error decrementing likeCount for item ${itemId}:`, error);
      if (
        error instanceof Error &&
        error.message.includes("no document to update")
      ) {
        console.warn(`Item ${itemId} document not found on decrement.`);
      }
    }
  },
);

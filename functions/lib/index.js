"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrementLikeCount = exports.incrementLikeCount = void 0;
// functions/src/index.ts
const firestore_1 = require("firebase-functions/v2/firestore");
const firebase_admin_1 = __importDefault(require("firebase-admin")); // Admin SDK
firebase_admin_1.default.initializeApp();
exports.incrementLikeCount = (0, firestore_1.onDocumentCreated)("likes/{likeId}", async (event) => {
    const snap = event.data;
    const data = snap.data();
    if (!data) {
        console.error("Document data is undefined for onCreate trigger.");
        return;
    }
    const itemId = data.itemId;
    const itemRef = firebase_admin_1.default.firestore().collection("items").doc(itemId);
    try {
        await itemRef.update({
            likeCount: firebase_admin_1.default.firestore.FieldValue.increment(1),
        });
        console.log(`Item ${itemId} likeCount incremented.`);
    }
    catch (error) {
        console.error(`Error incrementing likeCount for item ${itemId}:`, error);
        if (error instanceof Error &&
            error.message.includes("no document to update")) {
            await itemRef.set({ likeCount: 1 }, { merge: true });
            console.log(`Item ${itemId} likeCount initialized to 1.`);
        }
    }
});
exports.decrementLikeCount = (0, firestore_1.onDocumentDeleted)("likes/{likeId}", async (event) => {
    const snap = event.data;
    const data = snap.data();
    if (!data) {
        console.error("Document data is undefined for onDelete trigger.");
        return;
    }
    const itemId = data.itemId;
    const itemRef = firebase_admin_1.default.firestore().collection("items").doc(itemId);
    try {
        await itemRef.update({
            likeCount: firebase_admin_1.default.firestore.FieldValue.increment(-1),
        });
        console.log(`Item ${itemId} likeCount decremented.`);
    }
    catch (error) {
        console.error(`Error decrementing likeCount for item ${itemId}:`, error);
        if (error instanceof Error &&
            error.message.includes("no document to update")) {
            console.warn(`Item ${itemId} document not found on decrement.`);
        }
    }
});
//# sourceMappingURL=index.js.map
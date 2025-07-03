// hooks/useUserData.js
import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@firebaseApp";
import { t, s, r, img } from "@res";

export function useUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoading(true);
        setError(null);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          let profileData = {};
          
          if (userDocSnap.exists()) {
            profileData = userDocSnap.data();
          } else {
            console.log("No user data found for uid:", user.uid);
          }

          const likedItemIds = new Set();
          const likesQuery = query(collection(db, "likes"), where("userId", "==", user.uid));
          const likesQuerySnap = await getDocs(likesQuery);
          likesQuerySnap.forEach(likeDoc => {
            likedItemIds.add(likeDoc.data().itemId);
          });

          if(!profileData.iconURL) profileData.iconURL = img.thumb_default;

          setUserData({ 
            uid: user.uid, 
            ...profileData, 
            likedItemIds: likedItemIds
          });

        } catch (err) {
          console.error("Error fetching user data:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userData, loading, error };
}

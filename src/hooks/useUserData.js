// hooks/useUserData.js
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

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
          // Firestoreからユーザーデータを取得
          const userDocRef = doc(db, "users", user.uid); // user.uid を使用
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log("No user data found for uid:", user.uid);
            setUserData(null); // データが見つからない場合もnullに
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        // ユーザーがログインしていない場合
        setUserData(null);
        setLoading(false);
      }
    });

    // クリーンアップ関数: 認証状態の監視を解除
    return () => unsubscribe();
  }, []); // 依存配列が空なので、コンポーネントマウント時に一度だけ実行

  return { userData, loading, error };
}
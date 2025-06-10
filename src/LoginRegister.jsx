// LoginRegister.jsx
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from './firebase';
import './index.css'

export default function LoginRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (e) {
      alert("ログイン失敗: " + e.message);
    }
  };

  const register = async () => {
    // 重複チェック
    const q = query(collection(db, "users"), where("username", "==", username));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      alert("そのユーザー名は既に使われています。");
      return;
    }
    
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        username: username,
        email: email
      });
      navigate("/home");
    } catch (e) {
      alert("登録失敗: " + e.message);
    }
  };

  return (
    <div className="max-w-xs mx-auto my-20 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-center mb-4">ログイン or 会員登録</h2>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="メールアドレス"
        value={email} onChange={(e) => setEmail(e.target.value)}
        />
      <input
        type="password"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      <button
        className="w-full bg-blue-500 text-white p-2 mb-2 rounded hover:bg-blue-700 cursor-pointer"
        onClick={login}>ログイン</button>
      <button
        className="w-full bg-green-500 text-white p-2 mb-2 rounded hover:bg-green-700 cursor-pointer"
        onClick={register}>会員登録</button>
    </div>
  );
}

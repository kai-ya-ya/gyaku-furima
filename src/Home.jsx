// src/Home.jsx
import React from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <h1>ようこそ！</h1>
      <p>ユーザーID: {auth.currentUser?.uid}</p>
      <p>メールアドレス: {auth.currentUser?.email}</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Home;

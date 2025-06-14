// src/Mypage.jsx
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from './firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { Loading } from "./Loading";
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';

const Mypage = () => {
  const navigate = useNavigate();
  const { userData, loading, error } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
    } catch (logoutError) {
      console.error("ログアウト中にエラーが発生しました:", logoutError);
    }
  };

  useEffect(() => {
    if (!loading && !userData) {
      navigate(r.toppage);
    }
  }, [loading, userData, navigate, r.toppage]);

  if (loading || !userData) {
    return <Loading />;
  }

  return (
    <div>
      <TopBar />
      <div className={s.win_frame}>
        <h2 className={s.win_title}>{t.pages.mypage.title}</h2>
        <p>{t.userdata.uid}: {userData.uid}</p>
        <p>{t.userdata.username}: {userData.username}</p>
        <p>{t.userdata.email}: {userData.email}</p>
        <button onClick={handleLogout} className="w-auto text-red-500 p-2 mb-2 rounded hover:bg-red-500 hover:text-white cursor-pointer">{t.pages.mypage.go_signout}</button>
      </div>
    </div>
  );
};

export default Mypage;
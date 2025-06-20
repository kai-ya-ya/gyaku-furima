// src/Mypage.jsx
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from './firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { text as t, style as s, route as r } from './res';
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
      <div className={s.win.flexbox}>
        <div className={s.item.title}>{t.pages.mypage.title}</div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="flex flex-row justify-between border-b-2 border-red-300/50">
            <div>{t.userdata.uid}</div><div>{userData.uid}</div>
          </div>
          <div className="flex flex-row justify-between border-b-2 border-red-300/50">
            <div>{t.userdata.username}</div><div>{userData.username}</div>
          </div>
          <div className="flex flex-row justify-between border-b-2 border-red-300/50">
            <div>{t.userdata.email}</div><div>{userData.email}</div>
          </div>
        </div>
        <button onClick={handleLogout} className={s.item.btn.other}>{t.pages.mypage.go_signout}</button>
      </div>
    </div>
  );
};

export default Mypage;
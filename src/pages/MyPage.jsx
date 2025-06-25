// src/Mypage.jsx
import React from "react";
import { useState, useEffect, useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { TopBar, Loading } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from '@utils';

export default function Mypage() {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);

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
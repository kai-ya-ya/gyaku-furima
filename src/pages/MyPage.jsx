// src/Mypage.jsx
import React from "react";
import { useState, useEffect, useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Page, Frame } from "@components";
import { t, s, r, img } from "@res";

export default function Mypage() {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      navigate(r.toppage)
      await signOut(auth);
    } catch (logoutError) {
      console.error("ログアウト中にエラーが発生しました:", logoutError);
    }
  };

  return (
    <Page permission="login_only">
      <Frame title={t.pages.mypage.title}>
        <div className="flex flex-col items-center w-full align-center">
          <div className="w-1/4 aspect-square rounded-full">
            <img src={userData.iconURL} className="rounded-full w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
          <div className="flex flex-row justify-between border-b-2 border-red-400">
            <div>{t.userdata.uid}</div>
            <div>{userData.uid}</div>
          </div>
          <div className="flex flex-row justify-between border-b-2 border-red-400">
            <div>{t.userdata.username}</div>
            <div>{userData.username}</div>
          </div>
          <div className="flex flex-row justify-between border-b-2 border-red-400">
            <div>{t.userdata.email}</div>
            <div>{userData.email}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="text-red-400">
          {t.pages.mypage.go_signout}
        </button>
      </Frame>
    </Page>
  );
}

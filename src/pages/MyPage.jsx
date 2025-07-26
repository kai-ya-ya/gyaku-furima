// src/Mypage.jsx
import React from "react";
import { useState, useEffect, useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts/UserContext";
import Page from "@components/Page";
import Frame from "@components/Frame";
import Text from "@components/Text";
import { t, s, r, img } from "@res";

export default function Mypage() {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      navigate(r.toppage);
      await signOut(auth);
    } catch (logoutError) {
      console.error("ログアウト中にエラーが発生しました:", logoutError);
    }
  };

  return (
    <Page permission="login_only">
      <Frame
        tabs={[
          { id: "0", title: t.pages.mypage.title },
          { id: "1", title: "設定" },
        ]}
      >
        <div id="0">
          <div className="flex flex-col items-center w-full align-center">
            <div className="w-1/4 aspect-square rounded-full">
              <img src={userData.iconURL} className="w-full" />
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
        </div>
        <div id="1">
          <Text className="text-center" text="test" />
        </div>
      </Frame>
    </Page>
  );
}

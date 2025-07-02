import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { TopBar, Loading } from "@components";
import { t, s, r, img } from "@res";

export default function () {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);

  return (
    <div className="h-screen">
      <TopBar />
      <div className={s.win.flexbox + " h-5/6"}>
        <div className="flex flex-row justify-center gap-2">
          <button
            className={s.item.title_gray}
            onClick={() => navigate(r.sell)}
          >
            {t.pages.sell.title}
          </button>
          <div className={s.item.title}>|</div>
          <button className={s.item.title}>{t.pages.sell_ai.title}</button>
        </div>
        <div className="h-full border-0 border-red-400 bg-yellow-100/50 flex flex-col p-2">
            <div className="h-full ">

            </div>
            <div className="w-full h-10 flex flex-row gap-2">
                <div className="w-full h-full border-b-2 border-red-400 bg-white"></div>
                <button className="h-full aspect-square h-full bg-red-400 rounded-full text-center"><img src={img.chat_send} className="w-4/5 inline-block"></img></button>
            </div>
        </div>
      </div>
    </div>
  );
}

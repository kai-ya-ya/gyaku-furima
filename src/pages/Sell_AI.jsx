import React, { useState, useEffect, useContext, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Display, Loading } from "@components";
import { t, s, r, img } from "@res";

export default function () {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);
  const [typeText, setTypeText] = useState("");
  const [chats, setChats] = useState([]);
  const scrollRef = useRef(null);
  const topbarRef = useRef(null);
  const [topbarDim, setTopbarDim] = useState({h: 0, w: 0})

  useEffect(() => {
    const c = topbarRef.current;
    if(c) {
        setTopbarDim({ h: c.offsetHeight, w: c.offsetWidth })
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  const submitMessage = () => {
    if (typeText) {
      setChats([
        ...chats,
        {
          type: "user",
          text: typeText,
          dt_submit: new Date(),
        },
      ]);
    }
    setTypeText("");
    console.log(chats);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitMessage(typeText);
    }
  };

  return (
    <Display>
      <div className={"flex flex-col gap-y-4 bg-gray-100/50 p-4 flex-grow"}>
        <div className="flex flex-row justify-center gap-2 flex-shrink-0">
          <button
            className={s.item.title_gray}
            onClick={() => navigate(r.sell)}
          >
            {t.pages.sell.title}
          </button>
          <div className={s.item.title}>|</div>
          <button className={s.item.title}>{t.pages.sell_ai.title}</button>
        </div>
        <div className="w-full flex-grow bg-yellow-100 flex flex-col p-2 gap-2 h-0">
          {chats.length === 0 ? (
            <div className="flex-grow text-center text-gray-600">
              まだメッセージがありません
            </div>
          ) : (
            <div
              className="flex flex-col h-auto gap-2 flex-grow overflow-y-scroll "
              ref={scrollRef}
            >
              {chats.map((chat) => {
                let cname = "";
                switch (chat.type) {
                  case "test":
                    cname = s.item.message.system.view;
                    break;
                  case "user":
                    cname = s.item.message.user.view;
                    break;
                  default:
                    cname = s.item.message.system.view;
                }
                return (
                  <div className="flex flex-row w-full">
                    <div className="flex-grow min-w-[10%]"></div>
                    <div key={chat.dt_submit} className={cname}>
                      {chat.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="w-full h-10 flex flex-row gap-2">
            <input
              className={s.item.field.input + "w-full"}
              placeholder={"メッセージを入力"}
              value={typeText}
              onChange={(e) => setTypeText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="h-full aspect-square h-full"
              onClick={submitMessage}
            >
              <img src={typeText ? img.chat_send_yes : img.chat_send_no}></img>
            </button>
          </div>
        </div>
      </div>
    </Display>
  );
}

// Chat.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { collection, doc, getDoc, setDoc, query, orderBy, getDocs, FieldPath } from "firebase/firestore";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { t, s, r, img } from "@res";
import { extractTags, decorateTags, img2url, url2blob, genDateID } from "@utils";

export default function (props) {
  const [chats, setChats] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const itemid = props.itemid;
  const threadid = props.threadid;
  const [typeText, setTypeText] = useState("");

  const fetchChats = async () => {
    if (!itemid || !threadid) return;
    try {
      const q = query(collection(db, `items/${itemid}/threads/${threadid}/chats`), orderBy("__name__"));
      const snap = await getDocs(q);

      const chatData = {};
      snap.docs.forEach((doc) => {
        chatData[doc.id] = doc.data();
      });

      setChats(chatData);
    } catch (error) {
      console.error("チャット取得エラー:", error);
      setChats(null);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [itemid, threadid]);

  const handleSendChat = async () => {
    setIsSubmitting(true);

    const dt_submit = new Date();
    const chatRef = doc(db, `items/${itemid}/threads/${threadid}/chats`, genDateID(dt_submit));
    await setDoc(chatRef, {
      role: "user",
      text: typeText,
      dt_submit: dt_submit,
    });
    setTypeText("");

    fetchChats();
    setIsSubmitting(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendChat();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {!chats ? (
        <div>スレッドを選択してください</div>
      ) : Object.keys(chats).length === 0 ? (
        <div>コメントがありません</div>
      ) : (
        Object.keys(chats).map((key) => (
          <div className="w-full" key={key}>
            {chats[key].text}
          </div>
        ))
      )}
      {chats && (
        <div className="w-full h-10 flex flex-row gap-2">
          <input
            className={s.item.field.input + "w-full"}
            placeholder={"メッセージを入力"}
            value={typeText}
            onChange={(e) => setTypeText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="h-full aspect-square h-full" onClick={handleSendChat} disabled={isSubmitting}>
            <img src={typeText !== "" ? img.chat_send_yes : img.chat_send_no}></img>
          </button>
        </div>
      )}
    </div>
  );
}

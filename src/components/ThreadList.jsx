// ThreadList.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { collection, doc, getDocs, addDoc, setDoc, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import { auth, db, storage } from "@firebaseApp";
import Chat from "@components/Chat";
import { t, s, r, img } from "@res";
import { extractTags, decorateTags, img2url, url2blob, genDateID } from "@utils";

export default function (props) {
  const [threads, setThreads] = useState({});
  const [activeThread, setActiveThread] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateThreadForm, setShowCreateThreadForm] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const itemid = props.itemid;

  const fetchThreads = async () => {
    const q = query(collection(db, `items/${itemid}/threads/`));
    const snap = await getDocs(q);
    const threadsData = {};

    snap.docs.forEach((doc) => {
      threadsData[doc.id] = doc.data();
    });

    setThreads(threadsData);
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleCreateThread = async () => {
    setIsSubmitting(true);
    const threadRef = await addDoc(collection(db, `items/${itemid}/threads`), {
      title: newThreadTitle,
    });

    const dt_submit = new Date();
    const chatRef = doc(db, `items/${itemid}/threads/${threadRef.id}/chats`, genDateID(dt_submit));
    await setDoc(chatRef, {
      role: "system",
      text: `"${newThreadTitle}"が作成されました`,
      dt_submit: dt_submit,
    });

    setShowCreateThreadForm(false);
    fetchThreads();
    setIsSubmitting(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateThread(newThreadTitle);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 h-full p-0">
      <div className="flex flex-col gap-2 border-yellow-500 border-r-2 border-0 p-4">
        {Object.keys(threads) && Object.keys(threads).length > 0 ? (
          Object.keys(threads).map((key) => (
            <button key={key} className={(key == activeThread ? "text-red-400 " : "" ) + "w-full"} onClick={() => setActiveThread(key)}>
              {threads[key].title}
            </button>
          ))
        ) : (
          <div className={s.text.meta + "text-center"}>スレッドがありません</div>
        )}
        {showCreateThreadForm ? (
          <div className="w-full h-10 flex flex-row gap-2">
            <input
              className={s.item.field.input + "w-full"}
              placeholder={"スレッドタイトルを入力"}
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="h-full aspect-square h-full" onClick={handleCreateThread} disabled={isSubmitting}>
              <img src={newThreadTitle !== "" ? img.chat_send_yes : img.chat_send_no}></img>
            </button>
          </div>
        ) : (
          <button className={s.item.btn.ok} onClick={() => setShowCreateThreadForm(true)}>
            新しいスレッドの作成
          </button>
        )}
      </div>
      <Chat itemid={itemid} threadid={activeThread} />
    </div>
  );
}

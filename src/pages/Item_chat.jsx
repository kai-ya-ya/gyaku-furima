// Item_chat.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Page, Frame, Loading, ThreadList } from "@components";
import { t, s, r, img } from "@res";
import { extractTags, decorateTags, img2url, url2blob, genDateID } from "@utils";

export default function () {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);
  const [typeText, setTypeText] = useState("");
  const scrollRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemid = searchParams.get("id");
  const [chats, setChats] = useState({});
  const [threads, setThreads] = useState({});

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  const [chatTopbarDim, setChatTopbarDim] = useState({ h: 0, w: 0 });
  const chatTopbarRef = useRef(null);
  useEffect(() => {
    // setup topbar
    const c = chatTopbarRef.current;
    if (c) {
      setChatTopbarDim({ h: c.offsetHeight, w: c.offsetWidth });
    }
  }, []);

  return (
    <Page permission="login_only">
      <Frame>
        <div className="flex flex-row justify-center gap-2">
          <button className={s.item.title_gray} onClick={() => navigate(`${r.item}?id=${itemid}`)}>
            {t.pages.item.title}
          </button>
          <div className={s.item.title}>|</div>
          <button className={s.item.title}>{t.pages.item_comment.title}</button>
        </div>
        <div className="relative w-full flex-grow bg-yellow-100 flex flex-col gap-0 h-0">
          <ThreadList itemid={itemid} />
        </div>
      </Frame>
    </Page>
  );
}

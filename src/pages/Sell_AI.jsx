import React, { useState, useEffect, useContext, useRef } from "react";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { functions } from "@firebaseApp";
import { httpsCallable } from "firebase/functions";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Page, Frame, Loading } from "@components";
import { t, s, r, img } from "@res";
import { extractTags, decorateTags, img2url, url2blob } from "@utils";

export default function () {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);
  const [typeText, setTypeText] = useState("");
  const [chats, setChats] = useState([]);
  const scrollRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const geminiChatCallable = httpsCallable(functions, "geminiChat");

  useEffect(() => {
    const currentPage = Math.random().toString(36).substring(2, 10);
    // setChats([
    //   ...chats,
    //   {
    //     uid: Math.random().toString(36).substring(2, 10),
    //     role: "system",
    //     function: {
    //       type: "sell",
    //       sellInfo: {
    //         title: "title_by_system",
    //         thumb: currentPage,
    //         pages: {
    //           [currentPage]: {
    //             imgURL: "",
    //             desc: "desc_by_system\n#tags\n#by\n#system",
    //             prev: currentPage,
    //             next: currentPage,
    //           },
    //         },
    //         tags: extractTags("desc_by_system\n#tags\n#by\n#system"),
    //         level: 0,
    //         price: 0,
    //         sellerInfo: {
    //           uid: userData?.uid,
    //           username: userData?.username,
    //         },
    //         dt_upload: new Date(),
    //       },
    //       imgInfo: {
    //         [currentPage]: {
    //           dataURL: img.test,
    //           isSet: true,
    //         },
    //       },
    //     },
    //     text: "autofill_by_system",
    //     dt_submit: new Date(),
    //   },
    // ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    if (!userData) return;

    const fetchChatHistory = async () => {
      const userDocRef = doc(db, "users", userData.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists() && userDocSnap.data().chatHistory && userDocSnap.data().chatHistory.length > 0) {
        userDocSnap.data().chatHistory.forEach((chatInfo) => {
          if (chatInfo.parts[0].text) {
            const chat = {
              uid: Math.random().toString(36).substring(2, 10),
              role: chatInfo.role,
              text: chatInfo.parts[0].text,
              dt_submit: "",
            };
            setChats((prevChats) => [...prevChats, chat]);
          } else if (chatInfo.parts[0].functionCall?.name === "proposeFinalProduct") {
            const sellInfo = chatInfo.parts[0].functionCall.args.finalSellInfo;
            const currentPage = Math.random().toString(36).substring(2, 10);
            const modelMessage = {
              uid: Math.random().toString(36).substring(2, 10),
              role: "model",
              function: {
                type: "sell",
                sellInfo: {
                  title: sellInfo.name,
                  thumb: currentPage,
                  pages: {
                    [currentPage]: {
                      imgURL: "",
                      desc: sellInfo.desc,
                      prev: currentPage,
                      next: currentPage,
                    },
                  },
                  tags: extractTags(sellInfo.desc),
                  level: sellInfo.level,
                  price: 0,
                  sellerInfo: {
                    uid: userData?.uid,
                    username: userData?.username,
                  },
                  dt_upload: new Date(),
                },
                imgInfo: {
                  [currentPage]: {
                    dataURL: img.test,
                    isSet: true,
                  },
                },
              },
              text: chatInfo.parts[0].text,
              dt_submit: new Date(),
            };
            setChats((prevChats) => [...prevChats, modelMessage]);
          }
        });
      } else {
      }
    };

    fetchChatHistory();
  }, [userData]);

  const handleSendChat = async () => {
    if (!typeText.trim() || isSending) return;

    setIsSending(true);

    const userMessage = {
      uid: Math.random().toString(36).substring(2, 10),
      role: "user",
      text: typeText,
      dt_submit: new Date(),
    };

    // ユーザーのメッセージを先に追加
    setChats((prevChats) => [...prevChats, userMessage]);
    setTypeText("");

    try {
      const result = await geminiChatCallable({ message: userMessage.text });
      const responseData = result.data;
      let modelMessage;

      if (responseData.type === "text") {
        modelMessage = {
          uid: Math.random().toString(36).substring(2, 10),
          role: "model",
          text: responseData.message || "No response text.",
          dt_submit: new Date(),
        };
      } else if (responseData.type === "sell") {
        const sellInfo = responseData.sellInfo;
        const currentPage = Math.random().toString(36).substring(2, 10);
        modelMessage = {
          uid: Math.random().toString(36).substring(2, 10),
          role: "model",
          function: {
            type: "sell",
            sellInfo: {
              title: sellInfo.name,
              thumb: currentPage,
              pages: {
                [currentPage]: {
                  imgURL: "",
                  desc: sellInfo.desc,
                  prev: currentPage,
                  next: currentPage,
                },
              },
              tags: extractTags(sellInfo.desc),
              level: sellInfo.level,
              price: 0,
              sellerInfo: {
                uid: userData?.uid,
                username: userData?.username,
              },
              dt_upload: new Date(),
            },
            imgInfo: {
              [currentPage]: {
                dataURL: img.test,
                isSet: true,
              },
            },
          },
          text: responseData.message,
          dt_submit: new Date(),
        };
      } else {
        modelMessage = {
          uid: Math.random().toString(36).substring(2, 10),
          role: "model",
          text: `エラーが発生しました: ${responseData.message}`,
          dt_submit: new Date(),
        };
      }

      setChats((prevChats) => [...prevChats, modelMessage]);
    } catch (e) {
      console.log(`[ERR] handleSendChat: ${e}`);
      const errorMessage = {
        uid: Math.random().toString(36).substring(2, 10),
        role: "model",
        text: "サーバーとの通信でエラーが発生しました。",
        dt_submit: new Date(),
      };
      setChats((prevChats) => [...prevChats, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendChat(typeText);
    }
  };

  const handleClinkFuncChat = (chat) => {
    navigate(r.sell, { state: chat.function });
  };

  const getFuncChat = (chat) => {
    const sellInfo = chat.function?.sellInfo;
    switch (chat.function?.type) {
      case "sell":
        return (
          <div className="flex flex-col gap-2 ">
            <div className="grid grid-cols-[fit-content_fit-content] gap-x-2 w-full">
              <div>商品名:</div>
              <div>{sellInfo.title || "Not Found"}</div>
              <div>画像:</div>
              <div className="w-32">
                <img src={chat.function?.imgInfo[sellInfo.thumb]?.dataURL || img.thumb_default}></img>
              </div>
              <div>商品説明:</div>
              <div>{sellInfo.pages[sellInfo.thumb].desc || "Not Found"}</div>
              <div>タグ:</div>
              <div>{sellInfo.tags || "Not Found"}</div>
            </div>
            <button
              className={s.item.btn.ok + " rounded-full"}
              onClick={() => {
                handleClinkFuncChat(chat);
              }}
            >
              そのまま投稿
            </button>
          </div>
        );
        break;
      default:
        break;
    }
  };

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
          <button className={s.item.title_gray} onClick={() => navigate(r.sell)}>
            {t.pages.sell.title}
          </button>
          <div className={s.item.title}>|</div>
          <button className={s.item.title}>{t.pages.sell_ai.title}</button>
        </div>
        <div className="relative w-full flex-grow bg-yellow-100 flex flex-col p-0 gap-0 h-0">
          <div
            ref={chatTopbarRef}
            className="bg-red-400 text-white flex justify-between items-center px-4 py-2 absolute top-0 left-0 w-full z-50 gap-4 "
          >
            <button className="text-lg">設定</button>
            <div className="flex flex-row items-center gap-2"><img src={img.chara_02} className="rounded-full w-8"></img><div>キャラ１</div></div>
            <div className="text-lg">AI Chat</div>
          </div>
          <div className="flex flex-col overflow-y-scroll p-2">
            <div className="w-full shrink-0" style={{ height: `${chatTopbarDim.h}px` }} />
            <div className="flex flex-col overflow-y-scroll gap-2">
              {chats.length === 0 ? (
                <div className="flex-grow text-center text-gray-600">まだメッセージがありません</div>
              ) : (
                <div className="flex flex-col h-auto gap-2 flex-grow overflow-y-scroll " ref={scrollRef}>
                  {chats.map((chat) => {
                    let cname = "";
                    switch (chat.role) {
                      case "system":
                      case "model":
                        cname = s.item.message.system.view;
                        break;
                      case "user":
                        cname = s.item.message.user.view;
                        break;
                      default:
                        cname = s.item.message.system.view;
                    }
                    return (
                      <div className="flex flex-row w-full" key={chat.uid}>
                        <div className="flex-grow min-w-[10%]"></div>
                        <div key={chat.uid} className={cname + " flex flex-col gap-2"}>
                          <div>{chat.text}</div>
                          {chat.function && getFuncChat(chat)}
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
                <button className="h-full aspect-square h-full" onClick={handleSendChat} disabled={isSending}>
                  <img src={typeText ? img.chat_send_yes : img.chat_send_no}></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Frame>
    </Page>
  );
}

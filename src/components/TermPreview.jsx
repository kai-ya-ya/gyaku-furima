import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import { auth, db } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Term } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function ({ term, showHighlight }) {
  const { userData, loading, error } = useContext(UserContext);
  //   const [liked, setLiked] = useState(term.liked);
  //   const [currentLikeCount, setCurrentLikeCount] = useState(term.likeCount || 0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setLiked(props.liked);
  // }, [props.liked]);

  // useEffect(() => {
  //   setCurrentLikeCount(term.likeCount);
  // }, [term.likeCount]);

  // const handleLikeClick = async (event) => {
  //   event.stopPropagation();

  //   if (!userData || !userData.uid) {
  //     alert("いいねするにはログインが必要です。");
  //     return;
  //   }

  //   const likeDocRef = doc(db, "likes", `${userData.uid}_${term.id}`);
  //   const prevLiked = liked;
  //   const prevLikeCount = currentLikeCount;
  //   setLiked((prev) => !prev);
  //   setCurrentLikeCount((prev) => (prevLiked ? prev - 1 : prev + 1));

  //   try {
  //     if (prevLiked) {
  //       await deleteDoc(likeDocRef);
  //       console.log(`User ${userData.uid} unliked term ${term.id}`);
  //     } else {
  //       await setDoc(likeDocRef, {
  //         userId: userData.uid,
  //         termId: term.id,
  //         timestamp: new Date(),
  //       });
  //       console.log(`User ${userData.uid} liked term ${term.id}`);
  //     }
  //   } catch (error) {
  //     console.error("いいねの操作中にエラーが発生しました:", error);
  //     setLiked(prevLiked);
  //     setCurrentLikeCount(prevLikeCount);
  //     alert("いいねの操作に失敗しました。時間をおいてもう一度お試しください。");
  //   }
  // };

  // const handleCommentClick = (e) => {
  //   e.stopPropagation();
  //   navigate(`${r.term_comment}?id=${term.id}`);
  // };

  const goItem = (e) => {
    e.stopPropagation();
    navigate(`${r.term}?id=${term.id}`);
  };

  return (
    <div
      onClick={(e) => {
        goItem(e);
      }}
      role="button"
      className="grid grid-cols-2 justify-terms-stretch gap-2 p-2 bg-white border-black border-0 rounded-xl h-auto"
    >
      <Term term={term} showHighlight={showHighlight} />
      <div className="col-span-2 flex flex-row justify-between terms-center">
        <div className={s.term[term.data.itemInfo.type].tag}>{s.term[term.data.itemInfo.type].name}</div>
        <div className={s.text.meta}>{timeAgo(term.data.uploadInfo.createdAt)}</div>
      </div>
    </div>
  );
}

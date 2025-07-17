import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import { auth, db } from "@firebaseApp";
import { UserContext } from "@contexts";
import { TagList } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function ItemCard(props) {
  const item = props.item;
  const { userData, loading, error } = useContext(UserContext);
  const [liked, setLiked] = useState(item.liked);
  const [currentLikeCount, setCurrentLikeCount] = useState(item.likeCount || 0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setLiked(props.liked);
  // }, [props.liked]);

  // useEffect(() => {
  //   setCurrentLikeCount(item.likeCount);
  // }, [item.likeCount]);

  // const handleLikeClick = async (event) => {
  //   event.stopPropagation();

  //   if (!userData || !userData.uid) {
  //     alert("いいねするにはログインが必要です。");
  //     return;
  //   }

  //   const likeDocRef = doc(db, "likes", `${userData.uid}_${item.id}`);
  //   const prevLiked = liked;
  //   const prevLikeCount = currentLikeCount;
  //   setLiked((prev) => !prev);
  //   setCurrentLikeCount((prev) => (prevLiked ? prev - 1 : prev + 1));

  //   try {
  //     if (prevLiked) {
  //       await deleteDoc(likeDocRef);
  //       console.log(`User ${userData.uid} unliked item ${item.id}`);
  //     } else {
  //       await setDoc(likeDocRef, {
  //         userId: userData.uid,
  //         itemId: item.id,
  //         timestamp: new Date(),
  //       });
  //       console.log(`User ${userData.uid} liked item ${item.id}`);
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
  //   navigate(`${r.item_comment}?id=${item.id}`);
  // };

  const goItem = (e) => {
    e.stopPropagation();
    navigate(`${r.item}?id=${item.id}`);
  };

  return (
    <div
      onClick={(e) => {
        goItem(e);
      }}
      role="button"
      className="grid grid-cols-2 justify-items-stretch gap-2 p-2 bg-white border-black border-0 rounded-xl h-auto"
    >
      {/* <div className="flex flex-col w-full aspect-square overflow-y-scroll gap-2">
        <TagList tags={item.tags} size="xs"/>
      </div> */}
      <div className={"col-span-2 text-lg font-semibold truncate flex-none "+s.term[item.data.itemInfo.type].text}>{item.data.itemInfo.name || "No Title"}</div>
      <div className="col-span-2 flex flex-row justify-between items-center">
        {/* <div className={s.text.meta}>
          {t.item_card.username_seller}: {item.data.uploadInfo.userId || t.item_card.unk_seller}
        </div> */}
        <div className={s.term[item.data.itemInfo.type].tag}>{s.term[item.data.itemInfo.type].name}</div>
        <div className={s.text.meta}>{timeAgo(item.data.uploadInfo.createdAt)}</div>
      </div>
      {/* <div className="grid grid-cols-[1fr_min-content_min-content] grid-rows-2 gap-x-4 h-full place-items-center">
        <div></div>
        <div></div>
        <div className="font-bold text-yellow-400 text-center truncate">
          {currentLikeCount > 99 ? "99+" : currentLikeCount}
        </div>
        <div></div>
        <div onClick={handleCommentClick} type="button" className="w-8 text-center cursor-pointer">
          <img src={img.comment} className="w-full inline-block" alt="いいね" />
        </div>
        <div onClick={handleLikeClick} type="button" className="w-8 text-center cursor-pointer">
          <img src={liked ? img.like_yes : img.like_no} className="w-full inline-block" alt="いいね" />
        </div>
      </div> */}
    </div>
  );
}

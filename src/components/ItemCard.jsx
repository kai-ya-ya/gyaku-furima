import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import { auth, db } from "@firebaseApp";
import { UserContext } from "@contexts";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function ItemCard(props) {
  const item = props.item;
  const { userData, loading, error } = useContext(UserContext);
  const [liked, setLiked] = useState(item.liked);
  const [currentLikeCount, setCurrentLikeCount] = useState(item.likeCount || 0);
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(props.liked);
  }, [props.liked]);

  useEffect(() => {
    setCurrentLikeCount(item.likeCount);
  }, [item.likeCount]);

  const handleLikeClick = async (event) => {
    event.stopPropagation();

    if (!userData || !userData.uid) {
      alert("いいねするにはログインが必要です。");
      navigate(r.signin); // Redirect to sign-in page
      return;
    }

    const likeDocRef = doc(db, "likes", `${userData.uid}_${item.id}`);
    const prevLiked = liked;
    const prevLikeCount = currentLikeCount;
    setLiked((prev) => !prev);
    setCurrentLikeCount((prev) => (prevLiked ? prev - 1 : prev + 1));

    try {
      if (prevLiked) {
        await deleteDoc(likeDocRef);
        console.log(`User ${userData.uid} unliked item ${item.id}`);
      } else {
        // If it was not liked, add a new like document
        await setDoc(likeDocRef, {
          userId: userData.uid,
          itemId: item.id,
          timestamp: new Date(), // Store timestamp of the like
        });
        console.log(`User ${userData.uid} liked item ${item.id}`);
      }
    } catch (error) {
      console.error("いいねの操作中にエラーが発生しました:", error);
      // Revert UI if there's an error
      setLiked(prevLiked);
      setCurrentLikeCount(prevLikeCount);
      alert("いいねの操作に失敗しました。時間をおいてもう一度お試しください。");
    }
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    navigate(`${r.search}?q=${encodeURIComponent(tag)}`);
  };

  const goItem = (e) => {
    e.stopPropagation(); // Prevent propagation to parent div in case of nested clickables
    navigate(`${r.item}?id=${item.id}`);
  };

  return (
    <div
      onClick={(e) => {
        goItem(e);
      }}
      role="button"
      className="grid grid-cols-2 justify-items-stretch gap-2 p-2 bg-white border-b-2 border-red-300 h-auto"
    >
      <div className="">
        <img
          src={item.imageUrl || img.thumb_default}
          alt={item.name}
          className="w-auto"
        />
      </div>
      <div className="flex flex-col w-full aspect-square overflow-hidden gap-2">
        <div className={s.item.tag.xs.flexbox}>
          {Array.isArray(item.tags) && item.tags.length > 0 ? (
            item.tags.map((tag) => (
              <button
                key={tag}
                className={s.item.tag.xs.view}
                onClick={(e) => {
                  handleTagClick(e, tag);
                }}
              >
                {tag}
              </button>
            ))
          ) : (
            <span className={s.text.meta}>タグなし</span>
          )}
        </div>
      </div>
      <div className="col-span-2 text-lg font-semibold truncate flex-none">
        {item.name || "No Title"}
      </div>
      <div className="flex flex-col justify-end">
        {/* <div className={s.text.normal}>¥{item.price || "???"}</div> */}
        <div className={s.text.meta}>
          {t.item_card.username_seller}:{" "}
          {item.username_seller || t.item_card.unk_seller}
        </div>
        <div className={s.text.meta}>{timeAgo(item.dt_upload)}</div>
      </div>
      <div className="flex flex-row justify-end flex-nowrap gap-1">
        <div className="text-sm text-gray-600 flex items-center justify-center">
          {currentLikeCount}
        </div>
        <div
          onClick={handleLikeClick}
          type="button"
          className="w-1/4 flex items-center justify-center cursor-pointer"
        >
          <img
            src={liked ? img.like_yes : img.like_no}
            className="w-8"
            alt="いいね"
          />{" "}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import { auth, db } from "@firebaseApp";
import { UserContext } from "@contexts";
import { TagList } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function (props) {
  const item = props.item;
  const { userData, loading, error } = useContext(UserContext);
  const [liked, setLiked] = useState(item.liked);
  const [currentLikeCount, setCurrentLikeCount] = useState(item.likeCount || 0);
  const navigate = useNavigate();

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
      className=""
    >
      <div className="flex flex-row gap-2">
        {item.data.formulaInfo ? (
          item.data.formulaInfo.map((part, i) => {
            const key = `${i}-${part.category}-${part.id}`;
            console.log(key);
            switch (part.category) {
              case "term":
                console.log(s.term[part.data.itemInfo.type].text);
                const cname = `text-lg font-semibold truncate ${
                  s.term[part.data.itemInfo.type].text
                }`;
                return (
                  <div key={key} className={cname}>
                    {part.data.itemInfo.name}
                  </div>
                );
              case "operation":
                return <div key={key}>{part.data.itemInfo.name}</div>;
              default:
                return;
            }
          })
        ) : (
          <a></a>
        )}
      </div>
      {/* <div className={"col-span-2 text-lg font-semibold truncate flex-none "+s.term[item.data.itemInfo.type].text}>{item.data.itemInfo.name || "No Title"}</div> */}
      <div className="col-span-2 flex flex-row justify-between items-center">
        {/* <div className={s.term[item.data.itemInfo.type].tag}>{s.term[item.data.itemInfo.type].name}</div> */}
        <div className={s.text.meta}>{timeAgo(item.data.uploadInfo.createdAt)}</div>
      </div>
    </div>
  );
}

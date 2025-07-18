import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import { auth, db } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Text } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function (props) {
  const term = props.term;
  const { userData, loading, error } = useContext(UserContext);
  //   const [liked, setLiked] = useState(term.liked);
  //   const [currentLikeCount, setCurrentLikeCount] = useState(term.likeCount || 0);
  const navigate = useNavigate();

  const goItem = (e) => {
    e.stopPropagation();
    navigate(`${r.term}?id=${term.id}`);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-32 flex flex-col items-center justify-center px-4">
        <div className={"text-2xl font-semibold " + s.term[term.data.itemInfo.type].text}>
          {term.data.itemInfo.name || "No Title"}
        </div>
      </div>
      <div className={s.term[term.data.itemInfo.type].tag}>{s.term[term.data.itemInfo.type].name}</div>
      <Text
        cname={s.text.meta}
        text={`by ${term.data.uploadInfo.userId}, ${timeAgo(term.data.uploadInfo.createdAt)}`}
      />
      <Text text={term.data.itemInfo.desc} />
    </div>
  );
}

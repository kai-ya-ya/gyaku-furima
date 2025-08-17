// Fragment.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import { t, s, r, img, c } from "@res";

export default function ({ data }) {
  const { state, dispatch } = useContext(GameContext);
  let img_star = null;
  switch (data.star) {
    case 1:
      img_star = img.star_1;
      break;
    case 2:
      img_star = img.star_2;
      break;
    case 3:
      img_star = img.star_3;
      break;
  }
  return (
    <div className={`w-full flex gap-2 p-1 rounded-full ${s.fragments[data.type].bg}`}>
      <div className="h-full flex-shrink-0">
        <img className="h-8 bg-white rounded-full p-1" src={img_star}></img>
      </div>
      <button
        className="flex-grow truncate text-left"
        onClick={() => dispatch({ type: c.action.type.SELECT_FRAGMENT, value: data })}
      >
        {data.title}
      </button>
    </div>
  );
}

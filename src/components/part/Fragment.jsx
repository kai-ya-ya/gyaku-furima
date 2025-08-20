// Fragment.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import { t, s, r, img, c } from "@res";

export default function ({ fragment = {}, dispatch = null, isActive = false, activeSlot = null }) {
  let img_star = null;
  switch (fragment.star) {
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

  const handleClick = (e) => {
    e.stopPropagation();
    if (activeSlot) {
      dispatch({ type: c.action.type.SELECT_SLOT, value: activeSlot, debug: "Fragment.jsx - 0" });
    }
    dispatch({
      type: isActive ? c.action.type.DEACTIVE_FRAGMENT : c.action.type.ACTIVE_FRAGMENT,
      value: fragment,
      debug: "fragment.jsx - 1",
    });
  };

  return (
    <div
      className={`w-full flex gap-2 p-1 rounded-full ${s.fragments[fragment.type]?.bg || ""} border-2 ${
        isActive ? "border-white border-dashed" : "border-transparent"
      }`}
    >
      <div className="h-full flex-shrink-0">
        <img className="h-8 bg-white rounded-full p-1" src={img_star}></img>
      </div>
      <button className="flex-grow truncate text-left" onClick={handleClick}>
        {fragment.title}
      </button>
    </div>
  );
}

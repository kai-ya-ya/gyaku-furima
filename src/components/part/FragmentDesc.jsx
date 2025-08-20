// FragmentDesc.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Text from "../Text";

export default function ({ fragment, state_item, dispatch_item, className = "", conds = null, viewOnly = false }) {
  const handleSetSlot = (e) => {
    e.stopPropagation();
    dispatch_item({ type: c.action.type.SET_SLOT });
  };
  const handleRemoveSlot = (e) => {
    e.stopPropagation();
    dispatch_item({ type: c.action.type.REMOVE_SLOT });
  };
  const handleDeactiveFragment = (e) => {
    e.stopPropagation();
    dispatch_item({ type: c.action.type.DEACTIVE_FRAGMENT });
  };

  return (
    <div
      conds={conds}
      className={`border-2 border-black bg-white w-full rounded-xl flex flex-col p-2 gap-2 overflow-hidden flex-1 ${className}`}
    >
      <div
        className={`grid grid-rows-[min-content_min-content_1fr] grid-cols-2 justify-center p-2 overflow-hidden flex-1`}
      >
        <div className="row-span-3 grid grid-rows-[1fr_max-content_1fr] justify-center h-full overflow-hidden">
          <div></div>
          <img className="bg-gray-400 rounded-xl h-full" src={img.item_close}></img>
          <div></div>
        </div>
        <div className="text-center flex-shrink-0">{fragment?.title || "不明"} </div>
        <div className="text-center flex-shrink-0">{fragment?.type || "不明"} </div>
        <div className="text-center flex-shrink-0 overflow-y-scroll">{fragment?.desc || "不明"} </div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center flex-shrink-0">
        <button className="px-4 py-1 bg-green-300 border-0 border-black rounded-xl" onClick={handleDeactiveFragment}>
          閉じる
        </button>
        {viewOnly ? (
          <></>
        ) : Object.values(state_item.slot)
            .map((slotItem) => slotItem.fragment)
            .includes(state_item.activeFragment) ? (
          <button className="px-4 py-1 bg-green-300 border-0 border-black rounded-xl" onClick={handleRemoveSlot}>
            はずす
          </button>
        ) : (
          <button className="px-4 py-1 bg-green-300 border-0 border-black rounded-xl" onClick={handleSetSlot}>
            追加
          </button>
        )}
      </div>
    </div>
  );
}

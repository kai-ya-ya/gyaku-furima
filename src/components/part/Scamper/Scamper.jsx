// Scamper.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import FragmentList from "../FragmentList";
import FragmentDesc from "../FragmentDesc";
import ScamperSlot from "./ScamperSlot";
import { GameContext } from "@contexts/GameContext";
import { ItemContext } from "@contexts/ItemContext";
import Switch from "../../Switch";

export default function () {
  const { state, dispatch } = useContext(GameContext);
  const { state_item, dispatch_item } = useContext(ItemContext);
  console.log(state_item);

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
    <Switch target={!!state_item.activeFragment}>
      <ScamperSlot />
      <Switch target={!!state_item.activeFragment || !state_item.activeSlot}>
        <FragmentList cond={false} state_lc={state_item} dispatch_lc={dispatch_item} />
      </Switch>
      <div cond={true} className={`border-2 border-black bg-white w-full rounded-xl flex flex-col p-2 gap-2 overflow-hidden flex-1`}>
        <FragmentDesc fragment={state_item.activeFragment} />
        <div className="flex flex-row gap-2 justify-center items-center flex-shrink-0">
          <button className="px-4 py-1 bg-green-300 border-0 border-black rounded-xl" onClick={handleDeactiveFragment}>
            閉じる
          </button>
          {Object.values(state_item.slot)
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
      <button className="border-2 border-black" onClick={() => console.log(state_item)}>
        state_item check
      </button>
    </Switch>
  );
}

// Merge.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import FragmentList from "../FragmentList";
import FragmentDesc from "../FragmentDesc";
import MergeSlot from "./MergeSlot";
import { GameContext } from "@contexts/GameContext";
import { MergeContext } from "@contexts/MergeContext";
import Switch from "../../Switch";

export default function () {
  const { state, dispatch } = useContext(GameContext);
  const { state_merge, dispatch_merge } = useContext(MergeContext);

  const handleSetFragment = (e) => {
    e.stopPropagation();
    dispatch_merge({ type: c.action.type.SET_FRAGMENT });
  };
  const handleRemoveFragment = (e) => {
    e.stopPropagation();
    dispatch_merge({ type: c.action.type.REMOVE_FRAGMENT });
  };
  const handleUnselectFragment = (e) => {
    e.stopPropagation();
    dispatch_merge({ type: c.action.type.DEACTIVE_FRAGMENT });
  };

  return (
    <Switch target={!!state_merge.activeFragment}>
      <MergeSlot />
      <FragmentList cond={false} state_lc={state_merge} dispatch_lc={dispatch_merge} />
      <div
        cond={true}
        className={`border-2 border-black bg-white w-full rounded-xl flex flex-col p-2 gap-2 flex-1`}
      >
        <FragmentDesc fragment={state_merge.activeFragment} />
        <div className="flex flex-row gap-2 justify-center items-center flex-shrink-0">
          <button className="px-4 py-1 bg-green-300 border-0 border-black rounded-xl" onClick={handleUnselectFragment}>
            閉じる
          </button>
          {Object.values(state_merge.setFragments).includes(state_merge.activeFragment) ? (
            <button className="px-4 py-1 bg-green-300 border-0 border-black rounded-xl" onClick={handleRemoveFragment}>
              はずす
            </button>
          ) : (
            <button className="px-4 py-1 bg-green-300 border-0 border-black rounded-xl" onClick={handleSetFragment}>
              追加
            </button>
          )}
        </div>
      </div>
      <button cond={""} className="border-2 border-black" onClick={() => console.log(state_merge)}>
        state_merge check
      </button>
    </Switch>
  );
}

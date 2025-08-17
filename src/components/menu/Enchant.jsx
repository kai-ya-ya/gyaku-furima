// Enchant.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import FragmentList from "../part/FragmentList";
import FragmentDesc from "../part/FragmentDesc";
import MergeSlot from "../part/MergeSlot";
import { GameContext } from "@contexts/GameContext";

export default function () {
  const [activeFragment, setActiveFragment] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [fragments, setFragments] = useState({});
  const { state, dispatch } = useContext(GameContext);

  const handleSetFragments = (e) => {
    e.stopPropagation();
    setFragments((prev) => ({
      ...prev,
      [state.active_fragment.type]: state.active_fragment,
    }));
    dispatch({ type: c.action.type.SELECT_FRAGMENT, value: null });
  };

  return (
    <Frame
      tabs={[
        { id: "0", title: "合成" },
        { id: "1", title: "SCAMPER" },
      ]}
    >
      <div id="0" className="h-full flex flex-col gap-2">
        <FragmentList
          types={[c.fragment.type.NEEDS, c.fragment.type.SEEDS, c.fragment.type.PERSONA, c.fragment.type.CONTEXT]}
          initTabId={activeType}
        />
        {state.active_fragment ? (
          <div className="border-2 border-black bg-white w-full rounded-xl flex flex-row justify-between p-2 gap-2">
            <FragmentDesc fragment={state.active_fragment} />
            <div className="flex flex-row gap-2 justify-center items-end">
              <button
                className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl"
                onClick={() => dispatch({ type: c.action.type.SELECT_FRAGMENT, value: null })}
              >
                閉じる
              </button>
              <button className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl" onClick={handleSetFragments}>
                追加
              </button>
            </div>
          </div>
        ) : (
          <MergeSlot fragments={fragments} setFragments={setFragments} setActiveType={setActiveType} />
        )}
      </div>
    </Frame>
  );
}

// MergeSlot.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import { MergeContext } from "@contexts/MergeContext";
import Fragment from "../Fragment";
import Frame from "../../Frame";
import { api_debug } from "@utils";
import { t, s, r, img, c } from "@res";

export default function ({ className = "", cond = null }) {
  const [isReady, setIsReady] = useState(false);
  const { state, dispatch } = useContext(GameContext);
  const { state_merge, dispatch_merge } = useContext(MergeContext);

  const handleMerge = (e) => {
    e.stopPropagation();
    setIsReady(false);
    dispatch_merge({ type: c.action.type.DEACTIVE_FRAGMENT, debug: "MergeSlot.jsx - 5" });
    dispatch({ type: c.action.type.ENCHANT_MERGE, value: state_merge.setFragments });
    dispatch_merge({ type: c.action.type.RESET_FRAGMENTS, debug: "MergeSlot.jsx - 6" });
  };

  const handleRandomPick = (e) => {
    e.stopPropagation();
    let pickedFragments = {};

    state_merge.allowed_types.forEach((type) => {
      const filteredFragments = state.fragments.filter((fragment) => fragment.type === type);
      const pickedFragment = filteredFragments[Math.floor(Math.random() * filteredFragments.length)];
      pickedFragments[type] = pickedFragment;
    });

    dispatch_merge({ type: c.action.type.SET_FRAGMENTS, value: pickedFragments, debug: "MergeSlot.jsx - 0" });
  };

  const handleActiveFragmentType = (e, type) => {
    e.stopPropagation();
    dispatch_merge({ type: c.action.type.ACTIVE_FRAGMENT_TYPE, value: type, debug: "MergeSlot.jsx - 1" });
    dispatch_merge({ type: c.action.type.DEACTIVE_FRAGMENT, debug: "MergeSlot.jsx - 2" });
  };

  useEffect(() => {
    if (state_merge.allowed_types.some((type) => !state_merge.setFragments[type])) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [state_merge.setFragments]);

  useEffect(() => {
    console.log(`${!state.result_merge} && (${state_merge.activeFragment?.id} !== ${state.result_merge?.id})`)
    if (!!state.result_merge && (state_merge.activeFragment?.id !== state.result_merge?.id)) {
      dispatch({ type: c.action.type.RESET_RESULTS, debug: "MergeSlot.jsx - 3" });
    }
  }, [state_merge.activeFragment]);

  useEffect(() => {
    dispatch_merge({ type: c.action.type.ACTIVE_FRAGMENT, value: state.result_merge, debug: "MergeSlot.jsx - 4" });
  }, [state.result_merge?.id]);

  return (
    <div className={`border-2 border-black bg-white w-full rounded-xl ${className}`} cond={cond}>
      <div className="grid grid-cols-2 gap-2 p-2">
        {state_merge.allowed_types.map((type, i) =>
          state_merge.setFragments[type] ? (
            <Fragment
              key={type}
              fragment={state_merge.setFragments[type]}
              dispatch={dispatch_merge}
              isActive={state_merge.setFragments[type] === state_merge.activeFragment}
            />
          ) : (
            <button
              key={type}
              className={`px-3 py-1 rounded-full truncate border-2 border-dashed ${s.fragments[type].border}`}
              onClick={(e) => handleActiveFragmentType(e, type)}
            >
              {`${c.fragment.info[type].name}を指定してください`}
            </button>
          )
        )}
        <button className="text-center col-span-2" onClick={handleRandomPick}>
          🎲
        </button>
        <div className="col-span-2">
          {state.result_merge ? (
            <Fragment
              fragment={state.result_merge}
              dispatch={dispatch_merge}
              isActive={state.result_merge === state_merge.activeFragment}
            />
          ) : (
            <button
              className={`w-full px-3 py-1 rounded-full truncate border-2 border-dashed ${
                s.fragments[c.fragment.type.CHALLENGE].border
              }`}
              disabled={!isReady}
              onClick={handleMerge}
            >
              {isReady ? "合成開始" : "フラグメントを指定してください"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

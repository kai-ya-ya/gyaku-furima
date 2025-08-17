// MergeSlot.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import Fragment from "./Fragment";
import Frame from "../Frame";
import { api_debug } from "@utils";
import { t, s, r, img, c } from "@res";

export default function ({ fragments, setFragments, setActiveType }) {
  const [newChallenge, setNewChallenge] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const { state, dispatch } = useContext(GameContext);

  const handleGenNewChallenge = (e) => {
    e.stopPropagation();
    setIsReady(false);
    const response = api_debug({ type: c.action.type.ENCHANT_MERGE, value: fragments });
    dispatch({ type: c.action.type.ADD_FRAGMENT, value: response.data });
    setNewChallenge(response.data);
    console.log(state);
    setFragments(null);
  };

  const handleRandPick = (e) => {
    e.stopPropagation();
    let newFragments = {};
    [c.fragment.type.NEEDS, c.fragment.type.SEEDS, c.fragment.type.PERSONA, c.fragment.type.CONTEXT].forEach((type) => {
      const filteredFragments = state.fragments.filter((fragment) => fragment.type === type);
      const pickedFragment = filteredFragments[Math.floor(Math.random() * filteredFragments.length)];
      newFragments[type] = pickedFragment;
      return;
    });
    setFragments(newFragments);
  };

  useEffect(() => {
    if (
      !fragments ||
      [c.fragment.type.NEEDS, c.fragment.type.SEEDS, c.fragment.type.PERSONA, c.fragment.type.CONTEXT].some(
        (type) => !fragments[type]
      )
    ) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [fragments]);

  return (
    <div className="border-2 border-black bg-white w-full rounded-xl">
      <div className="grid grid-cols-2 gap-2 p-2">
        {[c.fragment.type.NEEDS, c.fragment.type.SEEDS, c.fragment.type.PERSONA, c.fragment.type.CONTEXT].map(
          (type, i) =>
            fragments && fragments[type] ? (
              <Fragment key={type} data={fragments[type]} />
            ) : (
              <button
                key={type}
                className={`px-3 py-1 rounded-full truncate border-2 border-dashed ${s.fragments[type].border}`}
                onClick={() => setActiveType(type)}
              >
                {`${c.fragment.info[type].name}を指定してください`}
              </button>
            )
        )}
        <button className="text-center col-span-2" onClick={handleRandPick}>
          🎲
        </button>
        <div className="col-span-2">
          {newChallenge ? (
            <Fragment data={newChallenge} />
          ) : (
            <button
              className={`w-full px-3 py-1 rounded-full truncate border-2 border-dashed ${
                s.fragments[c.fragment.type.CHALLENGE].border
              }`}
              disabled={!isReady}
              onClick={handleGenNewChallenge}
            >
              {isReady ? "合成開始" : "フラグメントを指定してください"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

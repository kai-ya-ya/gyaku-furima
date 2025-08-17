// MergeSlot.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import Fragment from "./Fragment";
import Frame from "../Frame";
import { t, s, r, img, c } from "@res";

export default function ({ fragments, setFragments, setActiveType }) {
  const [newChallenge, setNewChallenge] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const handleGenNewChallenge = (e) => {
    e.stopPropagation();
    setIsReady(false);
    setFragments(null);
  };

  useEffect(() => {
    if (!fragments || [c.types.NEEDS, c.types.SEEDS, c.types.PERSONA, c.types.CONTEXT].some((type) => !fragments[type])) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [fragments]);

  return (
    <div className="border-2 border-black bg-white w-full rounded-xl">
      <div className="grid grid-cols-2 gap-2 p-2">
        {[c.types.NEEDS, c.types.SEEDS, c.types.PERSONA, c.types.CONTEXT].map((type, i) =>
          fragments && fragments[type] ? (
            <Fragment key={type} data={fragments[type]} />
          ) : (
            <button
              key={type}
              className={`px-3 py-1 rounded-full truncate border-2 border-dashed ${s.fragments[type].border}`}
              onClick={() => setActiveType(type)}
            >
              {`${c.fragments[type].name}を指定してください`}
            </button>
          )
        )}
        <div className="text-center col-span-2">▼</div>
        <div className="col-span-2">
          {fragments && fragments[c.types.CHALLENGE] ? (
            <Fragment data={fragments[c.types.CHALLENGE]} />
          ) : (
            <button
              className={`w-full px-3 py-1 rounded-full truncate border-2 border-dashed ${
                s.fragments[c.types.CHALLENGE].border
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

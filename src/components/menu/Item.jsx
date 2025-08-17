// Item.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import FragmentList from "../part/FragmentList";
import FragmentDesc from "../part/FragmentDesc";
import { GameContext } from "@contexts/GameContext";

export default function () {
  const { state, dispatch } = useContext(GameContext);

  return (
    <Frame tabs={[{ id: "0", title: "フラグメント" }]} cname_body="h-full">
      <div id="0" className="h-full grid grid-rows-[1fr_max-content] gap-2">
        <FragmentList
          types={[c.fragment.type.NEEDS, c.fragment.type.SEEDS, c.fragment.type.PERSONA, c.fragment.type.CONTEXT, c.fragment.type.CHALLENGE, c.fragment.type.IDEA]}
        />
        {state.active_fragment && (
          <div className="border-2 border-black bg-white w-full rounded-xl flex flex-row justify-between p-2 gap-2">
            <FragmentDesc fragment={state.active_fragment} />
            <div className="flex flex-row gap-2 justify-center">
              <button
                className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl"
                onClick={() => dispatch({ type: c.action.type.SELECT_FRAGMENT, value: null })}
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </Frame>
  );
}

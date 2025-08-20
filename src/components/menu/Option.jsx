// Option.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import { GameContext } from "@contexts/GameContext";

export default function () {
  const { state, dispatch } = useContext(GameContext);

  const handleSendDebugMessage = (type, message) => {
    dispatch({ type: type, value: `デバッグ：${message}`});
  }

  return (
    <Frame
      tabs={[
        { id: "1", title: "デバッグ" },
        { id: "0", title: "全般" },
      ]}
    >
      <div id="0" className="h-full flex flex-col gap-2"></div>
      <div id="1" className="h-full flex flex-col gap-2">
        <button
          className="border-2 border-black"
          onClick={() => handleSendDebugMessage(c.action.type.DEBUG_RANDOM_FRAGMENTS, "ランダムにフラグメントを取得")}
        >ランダムにフラグメントを取得
        </button>
        <button
          className="border-2 border-black"
          onClick={() => handleSendDebugMessage(c.action.type.DEBUG_COMPLETE_FRAGMENTS, "全種類のフラグメントを取得")}
        >全種類のフラグメントを取得
        </button>
        <button
          className="border-2 border-black"
          onClick={console.log(state)}
        >
          state check
        </button>
      </div>
    </Frame>
  );
}

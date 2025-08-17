// Option.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import { GameContext } from "@contexts/GameContext";

export default function () {
  const { state, dispatch } = useContext(GameContext);

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
          onClick={() => dispatch({ type: "debug_addMessage", value: { role: "system", content: `this is test\n${Math.floor(Math.random() * 100)}` } })}
        >
          add dialog
        </button>
      </div>
    </Frame>
  );
}

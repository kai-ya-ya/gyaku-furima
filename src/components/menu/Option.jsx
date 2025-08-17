// Option.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import { GameContext } from "@contexts/GameContext";

export default function () {
  const { state, dispatch } = useContext(GameContext);

  const handleSendDebugMessage = () => {
    dispatch({ type: c.action.type.SEND_MESSAGE, value: { role: "user", content: `this is test\n${Math.floor(Math.random() * 100)}` } });
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
          onClick={handleSendDebugMessage}
        >
          add dialog
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

// MessageLog.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import { GameContext } from "@contexts/GameContext";

export default function () {
  const { state, dispatch } = useContext(GameContext);

  return (
    <Frame tabs={[{ id: "0", title: "会話ログ" }]}>
      <div id="0" className="bg-white border-black border-2 rounded-xl h-full p-2 flex flex-col gap-2 overflow-y-scroll">
        {state.messages.map((message, i) => (
          <div key={i} className="border-b-2 border-black p-2">
            {message && <Text text={`${message.role || "a"}: ${message.content || ""}`} />}
          </div>
        ))}
      </div>
    </Frame>
  );
}

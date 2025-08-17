// MessageView.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import { t, s, r, img, c } from "@res";

export default function () {
  const { state, dispatch } = useContext(GameContext);
  const index = state.messages.length - 1;

  return (
    <div className="bg-white border-black border-2 rounded-xl min-h-24 p-2">
      {`${state.messages[index]?.role || ""}: ${state.messages[index]?.content || ""}`}
    </div>
  );
}

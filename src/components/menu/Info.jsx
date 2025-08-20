// Info.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import { GameContext } from "@contexts/GameContext";

export default function () {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div className="grid grid-cols-1 gap-2 p-2 bg-white border-black border-2 rounded-xl">
      <div className="">{state.gameId || "不明"}</div>
      <div className="">勇者 {state.player.name || "不明"}</div>
      <div className="">{state.stage.day || "不明"}日目 {state.stage.hour || "不明"}時</div>
      <div className="">{state.stage.place || "不明"}</div>
      <div className="">{state.progress || "不明"}</div>
    </div>
  );
}

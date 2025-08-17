// GameTest.jsx
import React, { useState, useEffect, useContext } from "react";
import Frame from "../components/Frame";
import Footer from "../components/Footer";
import Text from "../components/Text";
import Menu from "../components/menu/Menu";
import MessageView from "../components/part/MessageView";
import { GameContext } from "@contexts/GameContext";
import { t, s, r, img, c } from "@res";

export default function () {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <div id="gameView" className="relative h-full w-full">
        <div
          className="flex flex-col justify-center h-full bg-black bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${img.bg_01})` }}
        ></div>
        <div className="h-full w-full absolute top-0 left-0 grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr_max-content]">
          <Menu />
          <div className=""></div>
          <div className=""></div>
          <div className="col-span-2 p-2">
            <MessageView />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

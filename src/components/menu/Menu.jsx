// Menu.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import Item from "./Item";
import Enchant from "./Enchant";
import MessageLog from "./MessageLog";
import Option from "./Option";
import Info from "./Info";
import { GameContext } from "@contexts/GameContext";

export default function () {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState();

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
    setActiveMenuItem(null);
  };

  const handleMenuItemClick = (e, tabName) => {
    e.stopPropagation();
    if (tabName === activeMenuItem) {
      setActiveMenuItem(null);
    } else {
      setActiveMenuItem(tabName);
    }
  };

  return (
    <>
      <div className="flex flex-row sm:flex-col col-span-2 sm:col-span-1 gap-2 p-2">
        <button className="bg-green-300 border-black border-0 rounded-xl w-16 h-16" onClick={(e) => handleMenuClick(e)}>
          <img src={menuOpen ? img.menu_open : img.menu_close} className="w-full"></img>
        </button>
        {menuOpen && (
          <>
            <button
              className="bg-green-300 border-black border-0 rounded-xl w-16 h-16"
              onClick={(e) => handleMenuItemClick(e, c.menu.ITEM)}
            >
              <img src={activeMenuItem === c.menu.ITEM ? img.item_open : img.item_close} className="w-full"></img>
            </button>
            <button
              className="bg-green-300 border-black border-0 rounded-xl w-16 h-16"
              onClick={(e) => handleMenuItemClick(e, c.menu.ENCHANT)}
            >
              <img src={img.enchant} className="w-full"></img>
            </button>
            <button
              className="bg-green-300 border-black border-0 rounded-xl w-16 h-16"
              onClick={(e) => handleMenuItemClick(e, c.menu.MESSAGE_LOG)}
            >
              <img src={img.log} className="w-full"></img>
            </button>
            <button
              className="bg-green-300 border-black border-0 rounded-xl w-16 h-16"
              onClick={(e) => handleMenuItemClick(e, c.menu.OPTION)}
            >
              <img src={img.option} className="w-full"></img>
            </button>
          </>
        )}
      </div>
      <div className="p-2 col-span-2 sm:col-span-1 row-span-2">
        {activeMenuItem === c.menu.ITEM ? (
          <Item />
        ) : activeMenuItem === c.menu.ENCHANT ? (
          <Enchant />
        ) : activeMenuItem === c.menu.MESSAGE_LOG ? (
          <MessageLog />
        ) : activeMenuItem === c.menu.OPTION ? (
          <Option />
        ) : (
          <Info />
        )}
      </div>
    </>
  );
}

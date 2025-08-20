// FragmentList.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import Fragment from "./Fragment";
import Frame from "../Frame";
import { t, s, r, img, c } from "@res";

export default function ({ state_lc = {}, dispatch_lc = null, conds = null, className = "" }) {
  const { state, dispatch } = useContext(GameContext);
  const activeSlot = state_lc.activeSlot || "0";
  const allowed_types = state_lc.slot[activeSlot].allowed_types;

  const tabs = Object.values(c.fragment.type)
    .filter((type) => allowed_types?.includes(type))
    .map((type, i) => ({ id: type, title: c.fragment.info[type].name, icon: "" }));

  const tabs_all = [...(allowed_types?.length > 1 ? [{ id: "all", title: "すべて", icon: "" }] : []), ...tabs];
  const getFragments = (types) => {
    const filteredFragments = state.fragments.filter((data) => types.includes(data.type));

    return (
      <>
        {filteredFragments.map((fragment, i) => (
          <Fragment
            key={fragment.id}
            fragment={fragment}
            dispatch={dispatch_lc}
            isActive={fragment === state_lc.activeFragment}
          />
        ))}
      </>
    );
  };

  return (
    <Frame tabs={tabs_all} conds={conds} cname_body={`flex-grow overflow-hidden ${className}`} cname_children="" initTabId={tabs_all[0].id}>
      {allowed_types?.length > 1 && (
        <div key={"all"} id={"all"} className="">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{getFragments(allowed_types)}</div>
        </div>
      )}
      {tabs.map((tab, i) => (
        <div key={i} id={tab.id} className="">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{getFragments(tab.id)}</div>
        </div>
      ))}
    </Frame>
  );
}

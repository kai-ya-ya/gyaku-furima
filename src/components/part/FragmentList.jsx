// FragmentList.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import Fragment from "./Fragment";
import Frame from "../Frame";
import { t, s, r, img, c } from "@res";

export default function ({ types, initTabId }) {
  const { state, dispatch } = useContext(GameContext);
  const tabs_fragment = Object.values(c.fragment.type)
    .filter((type) => types.includes(type))
    .map((type, i) => ({ id: type, title: c.fragment.info[type].name, icon: "" }));
  const tabs = [types.length > 1 && { id: "all", title: "すべて", icon: "" }, ...tabs_fragment];

  const getFragments = (types) => {
    const filteredFragments = state.fragments.filter((data) => types.includes(data.type));

    return (
      <>
        {filteredFragments.map((data, i) => (
          <Fragment key={data.id} data={data} />
        ))}
      </>
    );
  };

  return (
    <Frame tabs={tabs} cname_body="flex-grow overflow-hidden" cname_children="" initTabId={initTabId}>
      {types.length > 1 && (
        <div key={"all"} id={"all"} className="">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{getFragments(types)}</div>
        </div>
      )}
      {tabs_fragment.map((tab) => (
        <div key={tab.id} id={tab.id} className="">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{getFragments([tab.id])}</div>
        </div>
      ))}
    </Frame>
  );
}

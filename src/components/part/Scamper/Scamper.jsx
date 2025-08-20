// Scamper.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import FragmentList from "../FragmentList";
import FragmentDesc from "../FragmentDesc";
import ScamperSlot from "./ScamperSlot";
import { GameContext } from "@contexts/GameContext";
import { ItemContext } from "@contexts/ItemContext";
import Switch from "../../Switch";

export default function () {
  const { state, dispatch } = useContext(GameContext);
  const { state_item, dispatch_item } = useContext(ItemContext);

  return (
      <Switch target={[!!state_item.activeSlot, !!state_item.activeFragment]}>
      <ScamperSlot conds={[false, false]} />
      <FragmentList conds={[true, false]} state_lc={state_item} dispatch_lc={dispatch_item} />
      <FragmentDesc
        conds={[null, true]}
        state_item={state_item}
        dispatch_item={dispatch_item}
        fragment={state_item.activeFragment}
        viewOnly={state_item.activeFragment === state.result_scamper}
      />
      <button className="border-2 border-black" onClick={() => console.log(state_item)}>
        state_item check
      </button>
    </Switch>
  );
}

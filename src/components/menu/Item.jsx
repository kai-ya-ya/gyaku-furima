// Item.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import FragmentList from "../part/FragmentList";
import FragmentDesc from "../part/FragmentDesc";
import { GameContext } from "@contexts/GameContext";
import { ItemContext } from "@contexts/ItemContext";
import Switch from "../Switch";

export default function () {
  const { state, dispatch } = useContext(GameContext);
  const { state_item, dispatch_item } = useContext(ItemContext);

  useEffect(() => {
    dispatch_item({ type: c.action.type.SELECT_SLOT, value: "0", debug: "Item.jsx - 0" });
    dispatch_item({ type: c.action.type.SET_SLOT, debug: "Item.jsx - 1" });
    console.log(state_item);
  }, []);

  return (
    <Frame tabs={[{ id: "0", title: "フラグメント" }]} cname_body="h-full">
      <div id="0" className="h-full grid grid-rows-[1fr_max-content] gap-2">
        <Switch target={[!!state_item.activeFragment?.id]}>
          <FragmentList conds={[false]} state_lc={state_item} dispatch_lc={dispatch_item} />
          <FragmentDesc
            conds={[true]}
            state_item={state_item}
            dispatch_item={dispatch_item}
            fragment={state_item.activeFragment}
            viewOnly={true}
          />
        </Switch>
      </div>
    </Frame>
  );
}

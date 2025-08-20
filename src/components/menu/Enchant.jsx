// Enchant.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Scamper from "../part/Scamper/Scamper";
import Merge from "../part/Merge/Merge";
import { ItemProvider } from "@contexts/ItemContext";

export default function () {
  return (
    <Frame
      tabs={[
        { id: "0", title: "合成" },
        { id: "1", title: "SCAMPER" },
      ]}
    >
      <div id="0" className="h-full flex flex-col gap-2">
        <ItemProvider
          allowed_setTypes={[
            [c.fragment.type.NEEDS],
            [c.fragment.type.SEEDS],
            [c.fragment.type.PERSONA],
            [c.fragment.type.CONTEXT],
          ]}
        >
          <Merge />
        </ItemProvider>
      </div>
      <div id="1" className="h-full flex flex-col gap-2">
        <ItemProvider
          allowed_types={[
            c.fragment.type.NEEDS,
            c.fragment.type.SEEDS,
            c.fragment.type.PERSONA,
            c.fragment.type.CONTEXT,
            c.fragment.type.CHALLENGE,
            c.fragment.type.IDEA,
          ]}
          allowed_setTypes={[[c.fragment.type.ALL]]}
        >
          <Scamper />
        </ItemProvider>
      </div>
    </Frame>
  );
}

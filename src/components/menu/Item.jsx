// Item.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import Text from "../Text";
import FragmentList from "../part/FragmentList";
import FragmentDesc from "../part/FragmentDesc";

export default function () {
  const [activeFragment, setActiveFragment] = useState(null);

  return (
    <Frame tabs={[{ id: "0", title: "フラグメント" }]} cname_body="h-full">
      <div id="0" className="h-full grid grid-rows-[1fr_max-content] gap-2">
        <FragmentList
          types={[c.types.NEEDS, c.types.SEEDS, c.types.PERSONA, c.types.CONTEXT, c.types.CHALLENGE, c.types.IDEA]}
          activeFragment={activeFragment}
          setActiveFragment={setActiveFragment}
        />
        {activeFragment && (
          <div className="border-2 border-black bg-white w-full rounded-xl flex flex-row justify-between p-2 gap-2">
            <FragmentDesc fragment={activeFragment} />
            <div className="flex flex-row gap-2 justify-center">
              <button
                className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl"
                onClick={(e) => setActiveFragment(null)}
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </Frame>
  );
}

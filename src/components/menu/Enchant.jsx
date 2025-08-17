// Enchant.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import Frame from "../Frame";
import FragmentList from "../part/FragmentList";
import FragmentDesc from "../part/FragmentDesc";
import MergeSlot from "../part/MergeSlot";

export default function () {
  const [activeFragment, setActiveFragment] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [fragments, setFragments] = useState({});

  const handleSetFragments = (e, fragment) => {
    e.stopPropagation();
    setFragments((prev) => ({
      ...prev,
      [fragment.type]: fragment,
    }));
    setActiveFragment(null);
  };

  return (
    <Frame
      tabs={[
        { id: "0", title: "合成" },
        { id: "1", title: "SCAMPER" },
      ]}
    >
      <div id="0" className="h-full flex flex-col gap-2">
        <FragmentList
          types={[c.types.NEEDS, c.types.SEEDS, c.types.PERSONA, c.types.CONTEXT]}
          activeFragment={activeFragment}
          setActiveFragment={setActiveFragment}
          initTabId={activeType}
        />
        {activeFragment ? (
          <div className="border-2 border-black bg-white w-full rounded-xl flex flex-row justify-between p-2 gap-2">
            <FragmentDesc fragment={activeFragment} />
            <div className="flex flex-row gap-2 justify-center items-end">
              <button
                className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl"
                onClick={(e) => setActiveFragment(null)}
              >
                閉じる
              </button>
              <button
                className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl"
                onClick={(e) => handleSetFragments(e, activeFragment)}
              >
                追加
              </button>
            </div>
          </div>
        ) : (
          <MergeSlot fragments={fragments} setFragments={setFragments} setActiveType={setActiveType} />
        )}
      </div>
    </Frame>
  );
}

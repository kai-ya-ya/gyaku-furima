// GameTest.jsx
import React, { useState, useEffect, useContext } from "react";
import Frame from "../components/Frame";
import Footer from "../components/Footer";
import Text from "../components/Text";
import { t, s, r, img, c } from "@res";

export default function () {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("enchant");
  const [activeItem, setActiveItem] = useState(null);
  const [mergeSlot, setMergeSlot] = useState({});
  const testData = c.testData;

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

  const handleSetMergeSlot = (e, item) => {
    e.stopPropagation();
    setMergeSlot((prev) => ({
      ...prev,
      [item.type]: item,
    }));
    setActiveItem(null);
  };

  const getMergeSlotList = () => {
    return (
      <div className="grid grid-cols-2 gap-2 p-2">
        {["needs", "seeds", "persona", "context"].map((fragment, i) =>
          mergeSlot[fragment] ? (
            getFragment(mergeSlot[fragment])
          ) : (
            <button
              className={`px-3 py-1 rounded-full truncate border-2 border-dashed ${s.fragments[fragment].border}`}
            >
              なし
            </button>
          )
        )}
        <div className="text-center col-span-2">▼</div>
        <div className="col-span-2">
          {mergeSlot["problem"] ? (
            getFragment(mergeSlot["problem"])
          ) : (
            <button
              className={`w-full px-3 py-1 rounded-full truncate border-2 border-dashed ${s.fragments["problem"].border}`}
            >
              合成
            </button>
          )}
        </div>
      </div>
    );
  };

  const getFragmentList = (types) => {
    const tabs_fragment = [
      { id: "needs", title: "ニーズ", icon: "" },
      { id: "seeds", title: "シーズ", icon: "" },
      { id: "persona", title: "ペルソナ", icon: "" },
      { id: "context", title: "コンテクスト", icon: "" },
      { id: "problem", title: "プロブレム", icon: "" },
      { id: "idea", title: "アイデア", icon: "" },
    ].filter((tab) => types.includes(tab.id));
    const tabs = [types.length > 1 && { id: "all", title: "すべて", icon: "" }, ...tabs_fragment];

    return (
      <Frame tabs={tabs} cname_body="flex-grow overflow-hidden" cname_children="">
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
  };

  const getFragments = (types) => {
    const target = testData.filter((data) => types.includes(data.type));

    return <>{target.map((data, i) => getFragment(data))}</>;
  };

  const getFragment = (data) => {
    let img_star = img.star_1;
    if (data.star === 2) {
      img_star = img.star_2;
    } else if (data.star === 3) {
      img_star = img.star_3;
    }
    return (
      <div className={`w-full flex gap-2 p-1 rounded-full ${s.fragments[data.type].bg}`}>
        <div className="h-full flex-shrink-0">
          <img className="h-8 bg-white rounded-full p-1" src={img_star}></img>
        </div>
        <button className="flex-grow truncate text-left" onClick={() => setActiveItem(data)}>
          {data.title}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <div id="gameView" className="relative h-full w-full">
        <div
          className="flex flex-col justify-center h-full bg-black bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${img.bg_01})` }}
        ></div>
        <div className="h-full w-full absolute top-0 left-0 grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr_max-content]">
          <div className="flex flex-row sm:flex-col col-span-2 sm:col-span-1 gap-2 p-2">
            <button
              className="bg-green-300 border-black border-0 rounded-xl w-16 h-16"
              onClick={(e) => handleMenuClick(e)}
            >
              <img src={menuOpen ? img.menu_open : img.menu_close} className="w-full"></img>
            </button>
            {menuOpen && (
              <>
                <button
                  className="bg-green-300 border-black border-0 rounded-xl w-16 h-16"
                  onClick={(e) => handleMenuItemClick(e, "item")}
                >
                  <img src={activeMenuItem === "item" ? img.item_open : img.item_close} className="w-full"></img>
                </button>
                <button
                  className="bg-green-300 border-black border-0 rounded-xl w-16 h-16"
                  onClick={(e) => handleMenuItemClick(e, "enchant")}
                >
                  <img src={img.enchant} className="w-full"></img>
                </button>
                <button className="bg-green-300 border-black border-0 rounded-xl w-16 h-16">
                  <img src={img.log} className="w-full"></img>
                </button>
                <button className="bg-green-300 border-black border-0 rounded-xl w-16 h-16">
                  <img src={img.option} className="w-full"></img>
                </button>
              </>
            )}
          </div>
          <div className="p-2 col-span-2 sm:col-span-1 row-span-2">
            {activeMenuItem === "item" ? (
              <Frame tabs={[{ id: "0", title: "フラグメント" }]} cname_body="h-full">
                <div id="0" className="h-full grid grid-rows-[1fr_max-content] gap-2">
                  {getFragmentList(["needs", "seeds", "persona", "context", "problem", "idea"])}
                  {activeItem && (
                    <div className="border-2 border-black bg-white w-full rounded-xl flex flex-row justify-between p-2 gap-2">
                      <div className="flex flex-col justify-between">
                        <Text className="text-center" text={activeItem.title} />
                        <Text className="text-center" text={activeItem.type} />
                        <Text className="text-center" text={activeItem.desc} />
                      </div>
                      <div className="flex flex-row gap-2 justify-center">
                        <button
                          className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl"
                          onClick={(e) => setActiveItem(null)}
                        >
                          閉じる
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Frame>
            ) : activeMenuItem === "enchant" ? (
              <Frame
                tabs={[
                  { id: "0", title: "合成" },
                  { id: "1", title: "SCAMPER" },
                ]}
              >
                <div id="0" className="h-full flex flex-col gap-2">
                  {getFragmentList(["needs", "seeds", "persona", "context"])}
                  {activeItem ? (
                    <div className="border-2 border-black bg-white w-full rounded-xl flex flex-row justify-between p-2 gap-2">
                      <div className="flex flex-col justify-between">
                        <Text className="text-center" text={activeItem.title} />
                        <Text className="text-center" text={activeItem.type} />
                        <Text className="text-center" text={activeItem.desc} />
                      </div>
                      <div className="flex flex-row gap-2 justify-center items-end">
                        <button
                          className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl"
                          onClick={(e) => setActiveItem(null)}
                        >
                          閉じる
                        </button>
                        <button
                          className="h-16 w-16 bg-green-300 border-0 border-black rounded-xl"
                          onClick={(e) => handleSetMergeSlot(e, activeItem)}
                        >
                          追加
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-black bg-white w-full rounded-xl">{getMergeSlotList()}</div>
                  )}
                </div>
              </Frame>
            ) : (
              // <div className="bg-red-100 h-full flex flex-col p-2">
              //   <div className="bg-red-200 flex flex-col">
              //     {Array.from({ length: 5 }, (_, index) => (
              //       <div key={index}>2-1</div>
              //     ))}
              //   </div>
              //   <div className="bg-red-300 flex flex-col flex-grow overflow-hidden">
              //     <div className="bg-red-400 flex flex-col flex-grow overflow-scroll">
              //       {Array.from({ length: 30 }, (_, index) => (
              //         <div key={index}>3-1</div>
              //       ))}
              //     </div>
              //     <div className="bg-red-500 flex flex-col">
              //       {Array.from({ length: 3 }, (_, index) => (
              //         <div key={index}>3-2</div>
              //       ))}
              //     </div>
              //     <div className="bg-red-600 flex flex-col">
              //       {Array.from({ length: 5 }, (_, index) => (
              //         <div key={index}>3-3</div>
              //       ))}
              //     </div>
              //   </div>
              // </div>
              <div className="bg-white border-black border-2 rounded-xl p-2">基本情報</div>
            )}
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className="col-span-2 p-2">
            <div className="bg-white border-black border-2 rounded-xl h-24 p-2">aaa</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ScamperSlot.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import { ItemContext } from "@contexts/ItemContext";
import Fragment from "../Fragment";
import Frame from "../../Frame";
import { t, s, r, img, c } from "@res";

export default function ({ className = "", conds = null }) {
  const [scamperType, setScamperType] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const { state, dispatch } = useContext(GameContext);
  const { state_item, dispatch_item } = useContext(ItemContext);

  const handleScamper = (e) => {
    e.stopPropagation();
    setIsReady(false);
    dispatch({ type: scamperType, value: state_item.slot, debug: "ScamperSlot.jsx - 8" });
    dispatch_item({ type: c.action.type.RESET_SLOT, debug: "ScamperSlot.jsx - 6" });
  };

  const handleRandomPick = (e) => {
    e.stopPropagation();
    let pickedFragments = {};

    Object.entries(state_item.slot).forEach(([key, value]) => {
      const filteredFragments = state.fragments.filter((fragment) => value.allowed_types.includes(fragment.type));
      const pickedFragment = filteredFragments[Math.floor(Math.random() * filteredFragments.length)];
      pickedFragments[key] = { ...value, fragment: pickedFragment };
    });

    dispatch_item({ type: c.action.type.SET_SLOTS, value: pickedFragments, debug: "ScamperSlot.jsx - 0" });
  };

  const handleSelectSlot = (e, key) => {
    e.stopPropagation();
    if (state_item.activeSlot === key) {
      dispatch_item({ type: c.action.type.UNSELECT_SLOT, debug: "ScamperSlot.jsx - 7" });
    } else {
      dispatch_item({ type: c.action.type.SELECT_SLOT, value: key, debug: "ScamperSlot.jsx - 7" });
    }
  };

  useEffect(() => {
    if (Object.entries(state_item.slot).some(([key, value]) => !value.fragment) || !scamperType) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [state_item.slot, scamperType]);

  useEffect(() => {
    console.log(`${!!state.result_scamper} && (${state_item.activeFragment?.id} !== ${state.result_scamper?.id})`);
    if (!!state.result_scamper && state_item.activeFragment?.id !== state.result_scamper?.id) {
      dispatch({ type: c.action.type.RESET_RESULTS, debug: "ScamperSlot.jsx - 3" });
    }
  }, [state_item.activeFragment]);

  useEffect(() => {
    dispatch_item({ type: c.action.type.ACTIVE_FRAGMENT, value: state.result_scamper, debug: "ScamperSlot.jsx - 4" });
  }, [state.result_scamper?.id]);

  return (
    <div className={`border-2 border-black bg-white w-full rounded-xl ${className}`} conds={conds}>
      <div className="grid grid-cols-1 gap-2 p-2">
        {Object.entries(state_item.slot).map(([key, value]) =>
          value.fragment ? (
            <Fragment
              key={key}
              activeSlot={key}
              fragment={value.fragment}
              dispatch={dispatch_item}
              isActive={value.fragment === state_item.activeFragment}
            />
          ) : (
            <button
              key={key}
              className={`px-3 py-1 rounded-full truncate border-2 border-dashed ${s.fragments.all.border} text-gray-300`}
              onClick={(e) => handleSelectSlot(e, key)}
            >
              {value.allowed_types?.map((type, i) => (
                <>
                  <span>{c.fragment.info[type].name}</span>
                  {i < value.allowed_types.length - 1 && <span> | </span>}
                </>
              ))}
            </button>
          )
        )}
        <button className="text-center col-span-1" onClick={handleRandomPick}>
          🎲
        </button>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(c.action.type.ENCHANT_SCAMPER).map(([key, value], i) => (
            <button
              key={i}
              className={`py-4 h-full w-full text-white rounded-xl flex flex-col justify-between ${
                value === scamperType ? "bg-green-300" : "bg-gray-300"
              }`}
              onClick={() => setScamperType(value)}
            >
              <p className="text-2xl">{key}</p>
              <p className="text-sm">{c.scamper.info[key].name}</p>
            </button>
          ))}
        </div>
        <div className="col-span-1">
          {state.result_scamper ? (
            <Fragment
              fragment={state.result_scamper}
              dispatch={dispatch_item}
              isActive={state.result_scamper === state_item.activeFragment}
            />
          ) : (
            <button
              className={`w-full px-3 py-1 rounded-full truncate border-2 border-dashed ${
                s.fragments[c.fragment.type.CHALLENGE].border
              }`}
              disabled={!isReady}
              onClick={handleScamper}
            >
              {isReady ? "合成開始" : "フラグメントを指定してください"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

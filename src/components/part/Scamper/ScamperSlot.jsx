// ScamperSlot.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import { ItemContext } from "@contexts/ItemContext";
import Fragment from "../Fragment";
import Frame from "../../Frame";
import { t, s, r, img, c } from "@res";

export default function ({ className = "", cond = null }) {
  const [scamperType, setScamperType] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const { state, dispatch } = useContext(GameContext);
  const { state_item, dispatch_item } = useContext(ItemContext);

  const handleScamper = (e) => {
    e.stopPropagation();
    setIsReady(false);
    dispatch_item({ type: c.action.type.DEACTIVE_FRAGMENT, debug: "ScamperSlot.jsx - 5" });
    dispatch({ type: c.action.type.ENCHANT_MERGE, value: state_item.setFragments });
    dispatch_item({ type: c.action.type.RESET_FRAGMENTS, debug: "ScamperSlot.jsx - 6" });
  };

  const handleRandomPick = (e) => {
    e.stopPropagation();
    let pickedFragments = {};

    state_item.allowed_types.forEach((type) => {
      const filteredFragments = state.fragments.filter((fragment) => fragment.type === type);
      const pickedFragment = filteredFragments[Math.floor(Math.random() * filteredFragments.length)];
      pickedFragments[type] = pickedFragment;
    });

    dispatch_item({ type: c.action.type.SET_FRAGMENTS, value: pickedFragments, debug: "ScamperSlot.jsx - 0" });
  };

  const handleActiveFragmentType = (e, type) => {
    e.stopPropagation();
    dispatch_item({ type: c.action.type.ACTIVE_FRAGMENT_TYPE, value: type, debug: "ScamperSlot.jsx - 1" });
    dispatch_item({ type: c.action.type.DEACTIVE_FRAGMENT, debug: "ScamperSlot.jsx - 2" });
  };

  const handleSelectSlot = (e, slotItem) => {
    e.stopPropagation();
    if (state_item.activeSlot === slotItem) {
      dispatch_item({ type: c.action.type.UNSELECT_SLOT, debug: "ScamperSlot.jsx - 7" });
    } else {
      dispatch_item({ type: c.action.type.SELECT_SLOT, value: slotItem, debug: "ScamperSlot.jsx - 7" });
    }
  };

  useEffect(() => {
    if (state_item.allowed_types.some((type) => !state_item.setFragments[type])) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [state_item.setFragments]);

  useEffect(() => {
    console.log(`${!state.result_item} && (${state_item.activeFragment?.id} !== ${state.result_item?.id})`);
    if (!!state.result_item && state_item.activeFragment?.id !== state.result_item?.id) {
      dispatch({ type: c.action.type.RESET_RESULTS, debug: "ScamperSlot.jsx - 3" });
    }
  }, [state_item.activeFragment]);

  useEffect(() => {
    dispatch_item({ type: c.action.type.ACTIVE_FRAGMENT, value: state.result_item, debug: "ScamperSlot.jsx - 4" });
  }, [state.result_item?.id]);

  return (
    <div className={`border-2 border-black bg-white w-full rounded-xl ${className}`} cond={cond}>
      <div className="grid grid-cols-1 gap-2 p-2">
        {Object.entries(state_item.slot).map(([key, value]) =>
          value.fragment ? (
            <Fragment
              key={key}
              fragment={value.fragment}
              dispatch={dispatch_item}
              isActive={value.fragment === state_item.activeFragment}
            />
          ) : (
            <button
              key={key}
              className={`px-3 py-1 rounded-full truncate border-2 border-dashed ${s.fragments.all.border} text-gray-300`}
              onClick={(e) => handleSelectSlot(e, value)}
            >
              {value.allowed_types.map((type, i) => (
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
          {Object.entries(c.scamper.type).map(([key, value], i) => (
            <button
              key={i}
              className={`py-4 h-full w-full text-white rounded-xl flex flex-col justify-between ${
                value === scamperType ? "bg-green-300" : "bg-gray-300"
              }`}
              onClick={() => setScamperType(value)}
            >
              <p className="text-2xl">{key}</p>
              <p className="text-sm">{c.scamper.info[value].name}</p>
            </button>
          ))}
        </div>
        <div className="col-span-1">
          {state.result_item ? (
            <Fragment
              fragment={state.result_item}
              dispatch={dispatch_item}
              isActive={state.result_item === state_item.activeFragment}
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

// export function a({ targetFragment, setTargetFragment }) {
//   const [newFragment, setNewFragment] = useState(null);
//   const [scamperType, setScamperType] = useState(null);
//   const [isReady, setIsReady] = useState(false);
//   const { state, dispatch } = useContext(GameContext);

//   const handleGenNewFragment = (e) => {
//     e.stopPropagation();
//     setIsReady(false);
//     dispatch({ type: scamperType, value: targetFragment });
//     setTargetFragment(null);
//   };

//   useEffect(() => {
//     setNewFragment(state.tmp);
//   }, [state.tmp]);

//   useEffect(() => {
//     setNewFragment(null);
//   }, [state.active_fragment]);

//   const handleRandPick = (e) => {
//     e.stopPropagation();
//     const pickedFragment = state.fragments[Math.floor(Math.random() * state.fragments.length)];
//     setTargetFragment(pickedFragment);
//   };

//   useEffect(() => {
//     if (!targetFragment) {
//       setIsReady(false);
//     } else {
//       setIsReady(true);
//     }
//   }, [targetFragment]);

//   return (
//     <div className="border-2 border-black bg-white w-full rounded-xl">
//       <div className="grid grid-cols-1 gap-2 p-2">
//         {targetFragment ? (
//           <Fragment key="fragment" data={targetFragment} />
//         ) : (
//           <button key="fragment" className={`px-3 py-1 rounded-full truncate border-2 border-dashed`}>
//             {`フラグメントを指定してください`}
//           </button>
//         )}
//         <button className="text-center col-span-2" onClick={handleRandPick}>
//           🎲
//         </button>
//         <div className="grid grid-cols-7 gap-2">
//           {Object.entries(c.scamper.type).map(([key, value], i) => (
//             <button
//               key={i}
//               className={`py-4 h-full w-full text-white rounded-xl flex flex-col justify-between ${
//                 value === scamperType ? "bg-green-300" : "bg-gray-300"
//               }`}
//               onClick={() => setScamperType(value)}
//             >
//               <p className="text-2xl">{key}</p>
//               <p className="text-sm">{c.scamper.info[value].name}</p>
//             </button>
//           ))}
//         </div>
//         <div className="col-span-2">
//           {newFragment ? (
//             <Fragment data={newFragment} />
//           ) : (
//             <button
//               className={`w-full px-3 py-1 rounded-full truncate border-2 border-dashed`}
//               disabled={!isReady}
//               onClick={handleGenNewFragment}
//             >
//               {"変換"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

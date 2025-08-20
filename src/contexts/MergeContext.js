import React, { createContext, useReducer } from "react";
import { t, s, r, img, c } from "@res";

const initialState = {
  allowed_types: [c.fragment.type.NEEDS, c.fragment.type.SEEDS, c.fragment.type.PERSONA, c.fragment.type.CONTEXT],
  setFragments: {},
  activeFragment: null,
  activeFragmentType: null,
};

function reducer(state_merge, action) {
  let updates = {};
  switch (action.type) {
    case c.action.type.SET_FRAGMENT:
      updates = {
        activeFragment: null,
        setFragments: { ...state_merge.setFragments, [state_merge.activeFragment.type]: state_merge.activeFragment },
      };
      break;
    case c.action.type.SET_FRAGMENTS:
      updates = {
        activeFragment: null,
        setFragments: action.value,
      };
      break;
    case c.action.type.REMOVE_FRAGMENT:
      updates = {
        activeFragment: null,
        setFragments: { ...state_merge.setFragments, [state_merge.activeFragment.type]: null },
      };
      break;
    case c.action.type.RESET_FRAGMENTS:
      updates = {
        activeFragment: null,
        setFragments: {},
      };
      break;
    case c.action.type.ACTIVE_FRAGMENT:
      updates = { activeFragment: action.value };
      break;
    case c.action.type.DEACTIVE_FRAGMENT:
      updates = { activeFragment: null };
      break;
    case c.action.type.ACTIVE_FRAGMENT_TYPE:
      updates = { activeFragmentType: action.value };
      break;
    default:
      console.log(`${action.type} is not registered`);
      throw new Error();
  }
  console.log(`[${action.debug}] ${action.type}`);
  console.log({ ...state_merge, ...updates });
  return { ...state_merge, ...updates };
}

const MergeContext = createContext(initialState);

function MergeProvider({ children }) {
  const [state_merge, dispatch_merge] = useReducer(reducer, initialState);

  return <MergeContext.Provider value={{ state_merge, dispatch_merge }}>{children}</MergeContext.Provider>;
}

export { MergeContext, MergeProvider };

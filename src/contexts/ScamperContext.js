import React, { createContext, useReducer } from "react";
import { t, s, r, img, c } from "@res";

const initialState = {
  allowed_types: [c.fragment.type.NEEDS, c.fragment.type.SEEDS, c.fragment.type.PERSONA, c.fragment.type.CONTEXT],
  setFragments: {},
  activeFragment: null,
  activeFragmentType: null,
};

function reducer(state_scamper, action) {
  let updates = {};
  switch (action.type) {
    case c.action.type.SET_FRAGMENT:
      updates = {
        activeFragment: null,
        setFragments: { ...state_scamper.setFragments, [state_scamper.activeFragment.type]: state_scamper.activeFragment },
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
        setFragments: { ...state_scamper.setFragments, [state_scamper.activeFragment.type]: null },
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
  console.log({ ...state_scamper, ...updates });
  return { ...state_scamper, ...updates };
}

const ScamperContext = createContext(initialState);

function ScamperProvider({ children }) {
  const [state_scamper, dispatch_scamper] = useReducer(reducer, initialState);

  return <ScamperContext.Provider value={{ state_scamper, dispatch_scamper }}>{children}</ScamperContext.Provider>;
}

export { ScamperContext, ScamperProvider };

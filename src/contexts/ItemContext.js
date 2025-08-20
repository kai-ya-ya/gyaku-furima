import React, { createContext, useReducer } from "react";
import { t, s, r, img, c } from "@res";

const defaultState = {
  allowed_setTypes: [],
  slot: [],
  activeSlot: null,
  setFragments: {},
  activeFragment: null,
  activeFragmentType: null,
};

function initSlot(allowed_setTypes) {
  let slot = {};
  const { ALL, ...allTypes } = c.fragment.type;
  allowed_setTypes.map((types = [], i) => {
    slot[i] = {
      allowed_types: types.includes(c.fragment.type.ALL) ? Object.values(allTypes) : types,
      fragment: null,
    };
  });
  return slot;
}

function reducer(state_item, action) {
  let updates = {};
  switch (action.type) {
    case c.action.type.ACTIVE_FRAGMENT:
      updates = { activeFragment: action.value };
      break;
    case c.action.type.DEACTIVE_FRAGMENT:
      updates = {
        activeSlot: null,
        activeFragment: null,
      };
      break;
    case c.action.type.ACTIVE_FRAGMENT_TYPE:
      updates = { activeFragmentType: action.value };
      break;
    case c.action.type.SET_SLOT:
      updates = {
        activeFragment: null,
        activeSlot: null,
        slot: {
          ...state_item.slot,
          [state_item.activeSlot]: { ...state_item.slot[state_item.activeSlot], fragment: state_item.activeFragment },
        },
      };
      break;
    case c.action.type.SET_SLOTS:
      updates = {
        activeFragment: null,
        activeSlot: null,
        slot: { ...state_item.slot, ...action.value },
      };
      break;
    case c.action.type.REMOVE_SLOT:
      updates = {
        activeFragment: null,
        activeSlot: null,
        slot: {
          ...state_item.slot,
          [state_item.activeSlot]: { ...state_item.slot[state_item.activeSlot], fragment: null },
        },
      };
      break;
    case c.action.type.RESET_SLOT:
      updates = {
        activeFragment: null,
        activeSlot: null,
        slot: initSlot(state_item.allowed_setTypes),
      };
      break;
    case c.action.type.SELECT_SLOT:
      updates = {
        activeFragment: null,
        activeSlot: action.value,
      };
      break;
    case c.action.type.UNSELECT_SLOT:
      updates = {
        activeFragment: null,
        activeSlot: null,
      };
      break;
    default:
      console.log(`${action.type} is not registered`);
      throw new Error();
  }
  console.log(`[${action.debug}] ${action.type}`);
  console.log({ ...state_item, ...updates });
  return { ...state_item, ...updates };
}

const ItemContext = createContext(defaultState);

function ItemProvider({ children, allowed_setTypes }) {
  const initialState = {
    ...defaultState,
    allowed_setTypes: allowed_setTypes,
    slot: initSlot(allowed_setTypes),
  };
  const [state_item, dispatch_item] = useReducer(reducer, initialState);

  return <ItemContext.Provider value={{ state_item, dispatch_item }}>{children}</ItemContext.Provider>;
}

export { ItemContext, ItemProvider };

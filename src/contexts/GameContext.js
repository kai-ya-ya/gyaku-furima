import React, { createContext, useReducer } from "react";
import { t, s, r, img, c } from "@res";

const initialState = { "fragments": c.testData, messages: []};

function reducer(state, action) {
  switch (action.type) {
    case "select_item":
      return { ...state, active_items: [...state.active_items, action.value] };
    case "debug_addMessage":
        console.log(action)
      return { ...state, messages: [...state.messages, action.value] };
    case "debug_addFragment":
      return { ...state, fragments: [...state.fragments, action.value] };
    case "debug_genChallenge":
      return { ...state, fragments: [...state.fragments, action.value] };
    default:
      throw new Error();
  }
}

export const GameContext = createContext(initialState);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

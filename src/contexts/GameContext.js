import React, { createContext, useReducer } from "react";
import { t, s, r, img, c } from "@res";
import { api_debug } from "@utils";

// const initialState = { fragments: [], messages: [], userdata: {}, stagedata: {} };
const initialState = { ...api_debug({ type: c.action.type.INIT_GAME }).data };

function reducer(state, action) {
  console.log(`[${action.debug}] ${action.type}`);
  switch (action.type) {
    case c.action.type.RESET_RESULTS: {
      return { ...state, result_merge: null, result_scamper: null };
    }
    default: {
      const response = api_debug({ type: action.type, value: action.value, state: state || null });
      console.log(response);
      return { ...state, ...response.data };
    }
  }
}

const GameContext = createContext(initialState);

function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

export { GameContext, GameProvider };

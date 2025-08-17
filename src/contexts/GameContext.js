import React, { createContext, useReducer } from "react";
import { t, s, r, img, c } from "@res";
import { api_debug } from "@utils";

const initialState = { fragments: c.testData, messages: [] };

function reducer(state, action) {
  console.log(`reducer: ${action.type}`);
  console.log(action.value);

  switch (action.type) {
    case c.action.type.SELECT_ITEM:
      return { ...state, active_items: [...state.active_items, action.value] };
    case c.action.type.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.value] };
    case c.action.type.SEND_MESSAGE:
      const response = api_debug(action);
      const messageId = Math.floor(Math.random() * 10000);
      let newMessages = [];
      if (response.data.new_fragments && response.data.new_fragments.length > 0) {
        newMessages = response.data.new_fragments.map((fragment) => ({
          id: messageId,
          role: "system",
          content: `新しいフラグメント「${fragment.title}」を手に入れた`,
        }));
      }
      return {
        ...state,
        fragments: [...state.fragments, ...response.data.new_fragments],
        messages: [...state.messages, action.value, response.data.message, ...newMessages],
      };
    case c.action.type.ADD_FRAGMENT:
      return { ...state, fragments: [...state.fragments, action.value] };
    case c.action.type.SELECT_FRAGMENT:
      return { ...state, active_fragment: action.value };
    case c.action.type.ENCHANT_MERGE:
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

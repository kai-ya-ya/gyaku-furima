// MessageView.jsx
import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "@contexts/GameContext";
import { t, s, r, img, c } from "@res";

export default function () {
  const { state, dispatch } = useContext(GameContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = state.messageWindow;

  useEffect(() => {
    setCurrentIndex(0);
  }, [state.messages]);

  const handleNextMessage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => prev + 1);
  };
  const handleSkipMessage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => messages.length);
  };

  return (
    <div className="bg-white border-black border-2 rounded-xl min-h-24 p-2 flex flex-row w-full">
      {currentIndex < messages.length ? (
        <>
          <div onClick={handleNextMessage} className="flex-1">{`${messages[currentIndex]?.role || ""}: ${
            messages[currentIndex]?.content || ""
          }`}</div>
          <div className="flex flex-col justify-between flex-none">
            <button onClick={handleSkipMessage}>{"SKIP >>"}</button>
            <button onClick={handleNextMessage}>{"NEXT >>"}</button>
          </div>
        </>
      ) : (
        <>
          <div>メッセージなし</div>
        </>
      )}
    </div>
  );
}

// Sandbox.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import { functions } from "@firebaseApp";
import { httpsCallable } from "firebase/functions";

export default function () {
  return (
    <div className="h-screen w-screen flex flex-col p-2 bg-black">
      {/* 要素1: 固定高さ */}
      <div className="bg-blue-200 flex flex-col">
        <div>1</div>
      </div>

      {/* 要素2: 可変高さ */}
      <div className="flex flex-col flex-grow bg-red-200 overflow-hidden">
        {/* 2-1: 固定高さ */}
        <div className="bg-blue-300 flex flex-col">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index}>2-1</div>
          ))}
        </div>

        {/* 2-2: スクロール領域 */}
        <div className="bg-red-300 flex-grow overflow-y-auto">
          {Array.from({ length: 40 }, (_, index) => (
            <div key={index}>2-2</div>
          ))}
        </div>
      </div>

      {/* 要素3: 固定高さ */}
      <div className="bg-blue-200 flex flex-col">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index}>3</div>
        ))}
      </div>
    </div>
  );
}

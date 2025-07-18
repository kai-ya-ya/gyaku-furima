import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import { auth, db } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Text, Flex, HandDrawnBorderBox, Term } from "@components";
import { t, s, r, img } from "@res";

export default function ({ formula, showHighlight }) {
  const formulaInfo = formula?.data.formulaInfo;
  const { userData, loading, error } = useContext(UserContext);

  return (
    <div className="flex flex-row gap-1 flex-wrap items-center px-4">
      {formulaInfo &&
        formulaInfo.map((item, i) => {
          const key = `${i}-${item.category}-${item.id}`;
          let next = formulaInfo[i + 1]?.data.itemInfo.name;

          return (
            <>
              {item.category == "term" ? (
                <Term key={key} term={item} showHighlight={showHighlight} />
              ) : item.category == "operation" ? (
                <div key={key}>
                  <Text className={`text-2xl truncate`} text={item.data.itemInfo.name} />
                </div>
              ) : (
                <div></div>
              )}
              {/* {[].includes(next) && <div className="flex-grow w-full"></div>} */}
            </>
          );
        })}
    </div>
  );
}

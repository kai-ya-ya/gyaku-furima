import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "@contexts/UserContext";
import Text from "@components/Text";
import Term from "@components/Term";
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

          return item.category == "term" ? (
            <Term key={key} term={item} showHighlight={showHighlight} />
          ) : item.category == "operation" ? (
            <div key={key}>
              <Text className={`text-2xl truncate`} text={item.data.itemInfo.name} />
            </div>
          ) : (
            <div key={key}></div>
          );
        })}
    </div>
  );
}
// {/* {[].includes(next) && <div className="flex-grow w-full"></div>} */}

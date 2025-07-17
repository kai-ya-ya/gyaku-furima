import React, { useState, useEffect, useContext } from "react";

import { FormulaPreview } from "@components";
import { t, s, r, img } from "@res";

export default function (props) {
  const items = props.items;
  return (
    <div>
      {items && items.length !== 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {props.items.map((item, i) => {
            const key = `${i}-${item.category}-${item.id}`;
            console.log(key);
            return <FormulaPreview key={key} item={item} />;
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">{t.pages.toppage.no_items_found}</p>
      )}
    </div>
  );
}

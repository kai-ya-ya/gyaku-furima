import React, { useState, useEffect, useContext } from "react";

import { ItemCard } from "@components";
import { t, s, r, img } from "@res";

export default function (props) {
  return (
    <div>
      {props.items && props.items.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {props.items.map((item) => (
            <ItemCard key={item.id} item={item} liked={props.userData?.likedItemIds?.has(item.id) || false} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">{t.pages.toppage.no_items_found}</p>
      )}
    </div>
  );
}

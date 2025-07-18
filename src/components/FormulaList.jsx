import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "@contexts";
import { Text, Formula, HandDrawnBorderBox } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function ({ formulas }) {
  const navigate = useNavigate();

  const goFormula = (e, formula) => {
    e.stopPropagation();
    navigate(`${r.formula}?id=${formula.id}`);
  };

  return (
    <div>
      {formulas && formulas.length !== 0 ? (
        <div className="grid grid-cols-1 gap-2 p-0">
          {formulas.map((formula, i) => {
            const key = `${i}-${formula.category}-${formula.id}`;
            return (
              <>
                <div
                  onClick={(e) => {
                    goFormula(e, formula);
                  }}
                  role="button"
                  className="border-0 border-black p-2 rounded-xl flex flex-col gap-2"
                >
                  <div className="flex flex-row gap-x-1 gap-y-2 flex-wrap">
                    <Formula formula={formula} showHighlight={true}/>
                  </div>
                  <div className="col-span-2 flex flex-row justify-between formulas-center">
                    <div></div>
                    <div className={s.text.meta}>{timeAgo(formula.data.uploadInfo.createdAt)}</div>
                  </div>
                </div>
                {i < formulas.length - 1 && <HandDrawnBorderBox cname_bg={"border-black border-b-2 mx-4"} />}
              </>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">{t.pages.toppage.no_items_found}</p>
      )}
    </div>
  );
}

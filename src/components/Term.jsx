// Term.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HandDrawnBorderBox from "@components/HandDrawnBorderBox";
import Text from "@components/Text";
import { t, s, r, img } from "@res";

export default function ({ term, showHighlight }) {
  const navigate = useNavigate();
  const goTermPage = () => {
    if (showHighlight) {
      navigate(`${r.term}?id=${term.id}`);
    }
  };

  return (
    <HandDrawnBorderBox
      cname_bg={`${s.term[term.data.itemInfo.type].text}`}
      style_bg={{ "backgroundColor": showHighlight ? "" : "transparent" }}
    >
      <button onClick={goTermPage}>
        <Text className={""} text={term.data.itemInfo.name} />
      </button>
    </HandDrawnBorderBox>
  );
}

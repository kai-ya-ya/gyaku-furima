// Share.jsx
import React, { useState, forwardRef } from "react";
import { toPng } from "html-to-image";
import Text from "@components/Text";

const Share = forwardRef(function ShareComponent({ setImgUrl }, ref) {

  const handleShare = async () => {
    if (!ref?.current) return;

    try {
      await document.fonts.ready;

      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        style: {
          transform: "none",
          filter: "none",
        },
      });

      setImgUrl(dataUrl);
    } catch (error) {
      console.error("画像生成に失敗:", error);
    }
  };

  return (
    <div>
      <button onClick={handleShare}>
        <Text text="共有" />
      </button>
    </div>
  );
});

export default Share;

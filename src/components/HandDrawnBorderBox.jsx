// HandDrawnBorderBox.jsx
import React from "react";

export default function ({ children, cname_box = "", cname_bg = "", style_bg = {}, style_box={} }) {
  return (
    <>
      <div className={`relative ${cname_box}`} style={{ ...style_box }}>
        <div className={`absolute inset-0 ${cname_bg}`} style={{ filter: "url(#handDrawnNoise)", ...style_bg }}></div>
        <div className={`relative z-10 bg-transparent`}>{children}</div>
      </div>
    </>
  );
}

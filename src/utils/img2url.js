import React from "react";

import { t, s, c } from "@res";

export default function (img, w, h, type, quality) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = w || c.thumb_def_size;
  canvas.height = h || c.thumb_def_size;
  const iw = img.width;
  const ih = img.height;

  const iAspect = iw / ih;
  const cAspect = canvas.width / canvas.height;
  const sw = iAspect > cAspect ? ih * cAspect : iw;
  const sh = iAspect > cAspect ? ih : iw / cAspect;
  const sx = iAspect > cAspect ? (iw - sw) / 2 : 0;
  const sy = iAspect > cAspect ? 0 : (ih - sh) / 2;

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL(type || c.thumb_def_type, quality || c.thumb_def_quality);
}

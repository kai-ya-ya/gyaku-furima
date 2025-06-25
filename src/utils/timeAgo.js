// src/utils/timeAgo.js

import { t } from "@res";

export default function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date.toDate())) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    // return Math.floor(interval) + "年前";
    return "1年以上前";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "ヶ月前";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "日前";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "時間前";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "分前";
  }
  // return Math.floor(seconds) + "秒前";
  return "ほんの少し前";
}

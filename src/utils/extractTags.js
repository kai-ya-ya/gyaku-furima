import { t, s, c } from "@res";

export default function (text) {
  const tags = [];

  c.hashtag_regex.lastIndex = 0;
  let match;
  while ((match = c.hashtag_regex.exec(text)) !== null) {
    tags.push(match[0]);
  }

  return tags;
}

// /utils/genIcon.js
import { t, s, r, img } from "@res";

function getRandEmoji(ranges) {
  const possibleChars = [];
  for (const range of ranges) {
    const [start, end] = range;
    for (let i = start; i <= end; i++) {
      possibleChars.push(String.fromCodePoint(i));
    }
  }

  if (possibleChars.length === 0) {
    return "";
  }

  return possibleChars[Math.floor(Math.random() * possibleChars.length)];
}

const ranges_face = [[0x1F600, 0x1F637], [0x1F641, 0x1F644], [0x1F910, 0x1F917], [0x1F920, 0x1F925], [0x1F970, 0x1F97A]];
const ranges_animal = [[0x1F400, 0x1F43F]];

export default function (size) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const randomEmoji = getRandEmoji(ranges_animal);
  const fontSize = size * 0.75;

  if (!ctx) {
    console.error('Canvas context not available.');
    return '';
  }
  canvas.width = size;
  canvas.height = size;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000000';
  ctx.fillText(randomEmoji, size / 2, size / 1.8);
  
  return canvas.toDataURL('image/png');
}
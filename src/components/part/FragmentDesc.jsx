// FragmentDesc.jsx
import { t, s, r, img, c } from "@res";
import Text from "../Text";

export default function ({ fragment, className = "" }) {
  return (
    <div
      className={`grid grid-rows-[min-content_min-content_1fr] grid-cols-2 justify-center p-2 overflow-hidden flex-1 ${className}`}
    >
      <div className="row-span-3 grid grid-rows-[1fr_max-content_1fr] justify-center h-full overflow-hidden">
        <div></div>
        <img className="bg-gray-400 rounded-xl h-full" src={img.item_close}></img>
        <div></div>
      </div>
      <div className="text-center flex-shrink-0">{fragment?.title || "不明"} </div>
      <div className="text-center flex-shrink-0">{fragment?.type || "不明"} </div>
      <div className="text-center flex-shrink-0 overflow-y-scroll">{fragment?.desc || "不明"} </div>
    </div>
  );
}

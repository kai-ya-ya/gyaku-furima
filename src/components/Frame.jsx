// Frame.jsx
import { t, s, r, img } from "@res";

export default function (props) {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-4 items-center">
      {props.title && (
        <div className="text-center text-xl font-bold text-red-400">
          {props.title}
        </div>
      )}
      {props.children}
    </div>
  );
}

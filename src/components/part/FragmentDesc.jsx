// FragmentDesc.jsx
import { t, s, r, img, c } from "@res";
import Text from "../Text";

export default function ({ fragment }) {
  return (
    <div className="flex flex-col justify-between">
      <Text className="text-center" text={fragment?.title || "不明"} />
      <Text className="text-center" text={fragment?.type || "不明"} />
      <Text className="text-center" text={fragment?.desc || "不明"} />
    </div>
  );
}

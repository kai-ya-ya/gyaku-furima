// Frame.jsx
import { useNavigate } from "react-router-dom";
import { t, s, r, img } from "@res";

export default function (props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-0 bg-white items-center w-full">
        {props.tabs && (
          <div className="flex flex-row justify-center gap-0 w-full">
            {props.tabs.map((tab, i) => (
              <div key={i}>
                <button
                  className="text-black text-xl bg-white border-black border-2 border-b-0 px-12 rounded-t-lg"
                  onClick={() => navigate(tab.jump)}
                >
                  {tab.title}
                </button>
              </div>
            ))}
          </div>
        )}
      <div className="border-black bg-white border-2 rounded-lg p-2 w-full">
        {props.children}
      </div>
    </div>
  );
}

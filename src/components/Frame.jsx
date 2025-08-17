// Frame.jsx
import React, { useState, useEffect, useContext } from "react";

import Text from "@components/Text";
import { t, s, r, img } from "@res";

export default function ({ children, tabs = [], cname_body = "", cname_children = "", initTabId }) {
  const getTab = (tabId) => {
    return React.Children.toArray(children).filter((child) => {
      return React.isValidElement(child) && child.props && child.props.id === tabId;
    });
  };
  const [activeTabId, setActiveTabId] = useState(initTabId || (tabs.length > 0 ? tabs[0].id : children));
  useEffect(() => {
    if (initTabId) setActiveTabId(initTabId);
  }, [initTabId]);

  return (
    <div className={`flex flex-col gap-0 items-center h-full ${cname_body}`}>
      <div className="w-full">
        <div className="flex flex-row justify-start gap-0 overflow-x-scroll">
          {tabs.map((tab, i) => (
            <div
              key={i}
              className={`w-full bg-white border-black border-2 rounded-t-xl ${i < tabs.length - 1 && "border-r-0"} ${
                activeTabId === tab.id && "border-b-0"
              }`}
            >
              <button className="w-full" onClick={tab.id && (() => setActiveTabId(tab.id))}>
                <Text className="text-center px-2 py-1 truncate" text={tab.title} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-full bg-white p-2 border-black border-2 border-t-0 rounded-b-xl flex-grow overflow-scroll ${cname_children}`}
      >
        {getTab(activeTabId) || children}
      </div>
    </div>
  );
}

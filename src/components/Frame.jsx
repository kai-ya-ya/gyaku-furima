// Frame.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HandDrawnBorderBox, Text } from "@components";
import { t, s, r, img } from "@res";

export default function ({ children, tabs = [] }) {
  const getTab = (tabId) => {
    return React.Children.toArray(children).filter((child) => {
      return React.isValidElement(child) && child.props && child.props.id === tabId;
    });
  };
  const [activeTabId, setActiveTabId] = useState(tabs.length > 0 ? tabs[0].id : children);

  return (
    <div className="flex flex-col gap-0 bg-white items-center w-full">
      <div className="flex flex-row justify-start gap-0 w-full bg-white">
        {tabs.map((tab, i) => (
          <HandDrawnBorderBox
            key={i}
            cname_box={`w-full`}
            cname_bg={`border-black bg-white border-2 rounded-t-lg ${i < tabs.length - 1 && "border-r-0"} ${activeTabId === tab.id && "border-b-0"}`}
          >
            <button className="w-full" onClick={tab.id && (() => setActiveTabId(tab.id))}>
              <Text className="text-center py-1" text={activeTabId === tab.id ? `>>${tab.title}<<` : tab.title} />
            </button>
          </HandDrawnBorderBox>
        ))}
      </div>
      <HandDrawnBorderBox cname_box={`w-full p-2`} cname_bg={`border-black bg-white border-2 border-t-0 rounded-b-lg`}>
        {getTab(activeTabId) || children}
      </HandDrawnBorderBox>
    </div>
  );
}

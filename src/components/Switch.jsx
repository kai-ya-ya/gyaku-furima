import React, { useState, useEffect, useContext } from "react";

export default function ({ children, target }) {
  const checkConds = (conds) => {
    if (conds === null || conds === undefined) {
      return true;
    } else if (conds.length > 0 && conds.length == target.length) {
      return !conds.some((cond, i) => !(cond === null || cond === undefined || cond === target[i]));
    } else {
      return false;
    }
  };
  return (
    <>
      {React.Children.map(children, (child, index) => {
        const visibility = checkConds(child.props.conds) ? "" : "hidden";
        const newClassName = `${child.props.className || ""} ${visibility}`.trim();

        return (
          <>
            {React.cloneElement(child, {
              key: index,
              className: newClassName,
            })}
          </>
        );
      })}
    </>
  );
}

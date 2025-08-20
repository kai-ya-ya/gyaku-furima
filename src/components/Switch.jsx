import React, { useState, useEffect, useContext } from "react";

export default function ({ children, target }) {
  return (
    <>
      {React.Children.map(children, (child, index) => {
        const visibility =
          child.props.cond === null || child.props.cond === undefined || child.props.cond === target
            ? ""
            : "hidden";
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

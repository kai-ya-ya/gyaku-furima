// TopBar.jsx
import React, { forwardRef, useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { t, s, r, img } from "@res";
import { genIcon } from "@utils";

const TopBar = forwardRef((props, ref) => {
  const { userData, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="bg-white border-b-2 border-black text-black flex justify-between items-center px-4 py-2 fixed top-0 left-0 w-full z-50 gap-4"
    >
      <Link to={r.toppage} className="flex flex-row gap-2 items-center flex-0">
        {/* <img src={img.logo} className="h-9"></img> */}
        <div className={s.topbar.title+" text-black"}>{t.pages.topbar.title}</div>
      </Link>

      <div className="flex flex-row items-center gap-4">
        <Link
          to={userData ? r.sell : r.signin}
          className={s.topbar.btn}
        >
          {t.pages.sell.title}
        </Link>
        {userData ? (
          <div
            onClick={() => navigate(r.mypage)}
            className={"flex flex-row items-center gap-2 cursor-pointer"}
          >
            <div className={s.topbar.btn}>{userData.username}</div>
            <div className="flex items-center h-9 aspect-square">
              <img src={`${userData.iconURL}`} className="h-full rounded-full "></img>
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate(r.signin)}
            className={"flex flex-row items-center gap-2 cursor-pointer"}
          >
            <div className={s.topbar.btn}>{t.pages.signin.title}</div>
          </div>
        )}
      </div>
    </div>
  );
});

export default TopBar;

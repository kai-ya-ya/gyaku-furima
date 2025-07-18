// TopBar.jsx
import React, { forwardRef, useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "@contexts/UserContext";
import HandDrawnBorderBox from "@components/HandDrawnBorderBox";
import Flex from "@components/Flex";
import { t, s, r, img } from "@res";
import { genIcon } from "@utils";

const TopBar = forwardRef((props, ref) => {
  const { userData, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div ref={ref} className="fixed top-0 left-0 w-full z-50">
      <HandDrawnBorderBox
        cname_box="py-1 px-4"
        cname_bg="border-b-2 border-black"
        style_box={{ backgroundImage: `url(${img.bg_test})`, backgroundRepeat: "repeat" }}
      >
        <Flex dim="row" className="justify-between items-center gap-4">
          <Link to={r.toppage} className="flex flex-row gap-2 items-center flex-0">
            {/* <img src={img.logo} className="h-9"></img> */}
            <div className={s.topbar.title + " text-black"}>{t.pages.topbar.title}</div>
          </Link>

          <div className="flex flex-row items-center gap-4">
            <Link to={userData ? r.sell : r.signin} className={s.topbar.btn}>
              {t.pages.sell.title}
            </Link>
            {userData ? (
              <div onClick={() => navigate(r.mypage)} className={"flex flex-row items-center gap-2 cursor-pointer"}>
                <div className={s.topbar.btn}>{userData.username}</div>
                {/* <div className="flex items-center h-8 aspect-square">
                <img src={`${userData.iconURL}`} className=""></img>
              </div> */}
              </div>
            ) : (
              <div onClick={() => navigate(r.signin)} className={"flex flex-row items-center gap-2 cursor-pointer"}>
                <div className={s.topbar.btn}>{t.pages.signin.title}</div>
              </div>
            )}
          </div>
        </Flex>
      </HandDrawnBorderBox>
    </div>
  );
});

export default TopBar;
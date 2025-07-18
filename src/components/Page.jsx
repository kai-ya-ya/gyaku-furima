//Page.jsx
import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import Loading from "@components/Loading";
import Footer from "@components/Footer";
import TopBar from "@components/TopBar";
import { UserContext } from "@contexts/UserContext";
import { t, s, r, img } from "@res";

export default function ({ children, permission }) {
  const [topbarDim, setTopbarDim] = useState({ h: 0, w: 0 });
  const topbarRef = useRef(null);
  const { userData, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  // init
  useEffect(() => {
    // setup topbar
    const c = topbarRef.current;
    if (c) {
      setTopbarDim({ h: c.offsetHeight, w: c.offsetWidth });
    }
  }, []);

  // check login
  useEffect(() => {
    switch (permission) {
      case "login_only":
        if (!loading && !userData) {
          navigate(r.signin);
        }
        break;
      case "logout_only":
        if (!loading && userData) {
          navigate(r.toppage);
        }
        break;
      case null:
      default:
        break;
    }
  }, [permission, loading, userData, navigate]);

  return (
    <div
      className="flex flex-col h-screen overflow-y-scroll items-center font-SanariFontB002 p-2 gap-4"
      style={{ backgroundImage: `url(${img.bg_test})`, backgroundRepeat: "repeat" }}
    >
      <TopBar ref={topbarRef} />
      <div className="w-full shrink-0" style={{ height: `${topbarDim.h}px` }} />
      {loading ? <Loading /> : children}
      <div className="flex-grow"></div>
      <Footer />
      <svg className="hidden">
        <filter id="handDrawnNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur in="noise" stdDeviation="0.5" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
}

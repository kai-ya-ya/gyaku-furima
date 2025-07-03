//Frame.jsx
import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { TopBar, Footer, Loading } from "@components";
import { t, s, r, img } from "@res";

export default function (props) {
  const [topbarDim, setTopbarDim] = useState({ h: 0, w: 0 });
  const topbarRef = useRef(null);

  useEffect(() => {
    const c = topbarRef.current;
    if (c) {
      setTopbarDim({ h: c.offsetHeight, w: c.offsetWidth });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <TopBar ref={topbarRef} />
      <div className="w-full shrink-0" style={{ height: `${topbarDim.h}px` }} />
      {props.loading ? <Loading /> : props.children}
      <Footer />
    </div>
  );
}

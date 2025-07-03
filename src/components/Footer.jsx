//Footer.jsx
import React, { forwardRef, useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { TopBar } from "@components";
import { t, s, r, img } from "@res";

export default function Footer(props) {
  return (
    <div className="w-full h-10 flex flex-col justify-center items-center shrink-0">
        <div className="text-center text-sm text-gray-500">逆フリマ@Geiot2025</div>
    </div>
  );
}

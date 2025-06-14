// TopBar.jsx
import React from 'react';
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { useUser } from './contexts/UserContext';
import { useNavigate, Link } from "react-router-dom";

export default function TopBar() {
    const { userData, loading, error } = useUser();
    const navigate = useNavigate();
    let btn_lnk = r.signin;
    let btn_txt = t.pages.signin.title;

    if(userData) {
        btn_lnk = r.mypage;
        btn_txt = t.pages.mypage.title;
    }
    
    return (
        <div>
            <div className="h-16"></div>
            <div className="w-full bg-red-400 text-white flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
                <div className="flex items-center mx-4 my-2">
                    <Link to={r.toppage} className="text-white text-2xl font-bold">{t.pages.topbar.title}</Link>
                </div>

                <div className="flex items-center mx-4 my-2">
                    <button onClick={() => navigate(r.sell)} className={s.btn_other}>{t.pages.sell.title}</button>
                    <button onClick={() => navigate(btn_lnk)} className={s.btn_other}>{btn_txt}</button>
                </div>
            </div>
        </div>
    );
}
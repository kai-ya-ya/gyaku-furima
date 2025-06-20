// TopBar.jsx
import React from 'react';
import { text as t, style as s, route as r } from './res';
import { useUser } from './contexts/UserContext';
import { useNavigate, Link } from "react-router-dom";
import Logo from './res/logo.svg';

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
            <div className={s.topbar.dummy}></div>
            <div className="bg-red-400 text-white flex justify-between items-center px-4 py-2 fixed top-0 left-0 w-full z-50">
                <div className="flex flex-row gap-2 items-center">
                    <img src={Logo} className="h-9"></img>
                    <Link to={r.toppage} className={s.topbar.title}>{t.pages.topbar.title}</Link>
                </div>

                <div className="flex items-center">
                    <button onClick={() => navigate(userData ? r.sell : r.signin)} className={s.topbar.btn}>{t.pages.sell.title}</button>
                    <button onClick={() => navigate(btn_lnk)} className={s.topbar.btn}>{btn_txt}</button>
                </div>
            </div>
        </div>
    );
}
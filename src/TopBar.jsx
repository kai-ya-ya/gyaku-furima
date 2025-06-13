// TopBar.jsx
import React from 'react';
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { useUser } from './contexts/UserContext';
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const { userData, loading, error } = useUser();
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="h-20"></div>
            <div className="w-full bg-gray-400 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
                <div className="flex items-center">
                    <a href={r.toppage} className="text-white text-2xl font-bold mr-5 transition-colors">
                        {t.pages.topbar.title}
                    </a>
                </div>

                <div className="flex items-center">
                    { !userData ? 
                    <button onClick={() => navigate(r.signin)} className={s.btn_ok}>{t.pages.signin.title}</button> : 
                    <button onClick={() => navigate(r.mypage)} className={s.btn_ok}>{t.pages.mypage.title}</button>}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
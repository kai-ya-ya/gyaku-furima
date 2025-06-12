// SignIn.jsx
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from './firebase';
import './index.css';
import { text as t } from './text';
import { style as s } from './style';

export default function SignIn() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [msg_err, setMsgErr] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (e) {
            setMsgErr(e.message);
        }
    };

    return (
        <div className={s.win_popup}>
            <h2 className={s.win_title}>{t.pages.signin.title}</h2>
            <input
                type="email"
                className={s.field_input}
                placeholder={t.userdata.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className={s.field_input}
                placeholder={t.userdata.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {msg_err && (
                <div className={s.field_err}>
                    {msg_err}
                </div>
            )}

            <button
                className={s.btn_ok}
                onClick={login}>{t.pages.signin.go_signin}</button>
            <button
                className={s.btn_other}
                onClick={() => navigate('/signup')}>{t.pages.signin.go_signup}</button>
        </div>
    );
}

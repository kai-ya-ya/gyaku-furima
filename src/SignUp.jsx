// SignUp.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from './firebase';
import './index.css';
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from "./route";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [msg_err, setMsgErr] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        if(!username) {
            setMsgErr(t.msg.sign_up.invalid_username)
        }
        else if(!email) {
            setMsgErr(t.msg.sign_up.invalid_email)
        }
        else if(!password) {
            setMsgErr(t.msg.sign_up.invalid_password)
        }
        else {
            try {
                const userCred = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCred.user.uid), {
                    uid: userCred.user.uid,
                    username: username,
                    email: email
                });
                navigate(r.home);
            } catch (e) {
                setMsgErr(e.message);
            }
            const q = query(collection(db, "users"), where("email", "==", email));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                setMsgErr(t.msg.sign_up.email_exists);
            }
        }
    };

    return (
        <div className={s.win_popup}>
            <h2 className={s.win_title}>{t.pages.signup.title}</h2>
            <input
                className={s.field_input}
                placeholder={t.userdata.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
                onClick={register}>{t.pages.signup.go_signup}</button>
        </div>
    );
}

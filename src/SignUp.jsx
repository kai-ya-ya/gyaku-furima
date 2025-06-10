// SignUp.jsx
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from './firebase';
import './index.css';
import { text as t } from './text';

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
                navigate("/");
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
        <div className="max-w-xs mx-auto my-20 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center mb-4">{t.pages.signup.title}</h2>
            <input
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder={t.userdata.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder={t.userdata.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder={t.userdata.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {msg_err && (
                <div className="mb-4 p-2 rounded text-sm bg-red-100 text-red-700 text-xs text-center">
                    {msg_err}
                </div>
            )}
            <button
                className="w-full bg-blue-500 text-white p-2 mb-2 rounded hover:bg-blue-700 cursor-pointer"
                onClick={register}>{t.pages.signup.go_signup}</button>
        </div>
    );
}

// SignIn.jsx
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from './firebase';
import './index.css';
import { text as t } from './text';

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
        <div className="max-w-xs mx-auto my-20 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center mb-4">{t.pages.signin.title}</h2>
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
                <div className="mb-4 p-2 rounded text-sm bg-red-100 text-red-700">
                    {msg_err}
                </div>
            )}

            <button
                className="w-full bg-blue-500 text-white p-2 mb-2 rounded hover:bg-blue-700 cursor-pointer"
                onClick={login}>{t.pages.signin.go_signin}</button>
            <button
                className="w-full p-2 mb-2 rounded hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate('/signup')}>{t.pages.signin.go_signup}</button>
        </div>
    );
}

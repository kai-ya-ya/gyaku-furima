// SignUp.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import Page from "@components/Page";
import Frame from "@components/Frame";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg_err, setMsgErr] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!username) {
      setMsgErr(t.msg.sign_up.invalid_username);
    } else if (!email) {
      setMsgErr(t.msg.sign_up.invalid_email);
    } else if (!password) {
      setMsgErr(t.msg.sign_up.invalid_password);
    } else {
      try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setMsgErr(t.msg.sign_up.email_exists);
        } else {
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, "users", userCred.user.uid), {
            uid: userCred.user.uid,
            username: username,
            email: email,
          });
          navigate(r.toppage);
        }
      } catch (e) {
        setMsgErr(e.message);
      }
    }
  };

  return (
    <Page permission="logout_only">
      <Frame tabs={[{ id: "0", title: `${t.pages.signup.title}` }]}>
        <input
          className={s.item.field.input}
          placeholder={t.userdata.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className={s.item.field.input}
          placeholder={t.userdata.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={s.item.field.input}
          placeholder={t.userdata.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {msg_err && <div className={s.item.field.err}>{msg_err}</div>}
        <button className={s.item.btn.ok} onClick={register}>
          {t.pages.signup.go_signup}
        </button>
      </Frame>
    </Page>
  );
}

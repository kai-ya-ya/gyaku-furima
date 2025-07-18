import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts/UserContext";
import Page from "@components/Page";
import Frame from "@components/Frame";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg_err, setMsgErr] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(r.toppage);
    } catch (e) {
      setMsgErr(e.message);
    }
  };

  return (
    <Page permission="logout_only">
      <Frame tabs={[{id: "0", title: t.pages.signin.title}]}>
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

        <button className={s.item.btn.ok} onClick={login}>
          {t.pages.signin.go_signin}
        </button>
        <button className={s.item.btn.other} onClick={() => navigate(r.signup)}>
          {t.pages.signin.go_signup}
        </button>
      </Frame>
    </Page>
  );
}

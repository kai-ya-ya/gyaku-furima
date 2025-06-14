// src/Sell.jsx
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { Loading } from "./Loading";
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';

export default function Sell() {
  const navigate = useNavigate();
  const { userData, loading, error } = useUser();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState("");
  
  useEffect(() => {
    if (!loading && !userData) {
      navigate(r.signin);
    }
  }, [loading, userData, navigate, r.toppage]);

  if (loading) {
    return <Loading />;
  }
  if(!userData) {
    navigate(r.toppage);
  }

  const upload = async () => {
    try {
        await addDoc(collection(db, "items"), {
            name: name,
            desc: desc,
            tags: tags,
            price: price,
            username_seller: userData.username,
            uid_seller: userData.uid,
            dt_upload: new Date(),
        });
        navigate(r.toppage);
    } catch (e) {
        console.log(e.message);
    }
  }

  return (
    <div>
      <TopBar />
      <div className={s.win_frame}>
        <h2 className={s.win_title}>{t.pages.sell.title}</h2>
            <input
                className={s.field_input}
                placeholder={t.pages.sell.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                rows="5"
                className={s.field_input}
                placeholder={t.pages.sell.desc}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <input
                className={s.field_input}
                placeholder={t.pages.sell.tag}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <input
                type="number"
                className={s.field_input}
                placeholder={t.pages.sell.price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button
                className={"w-full " + s.btn_ok}
                onClick={upload}>{t.pages.sell.upload}</button>
      </div>
    </div>
  );
};
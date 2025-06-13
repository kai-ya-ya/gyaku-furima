// src/Mypage.jsx
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from './firebase';
import { signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { text as t } from './text';
import { route as r } from './route';
import { Loading } from "./Loading";
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';

const Mypage = () => {
  const navigate = useNavigate();
  const { userData, loading, error } = useUser();

  const handleLogout = async () => {
    await signOut(auth);
    navigate(r.toppage);
  };

  if (loading) {
    return <Loading />;
  }
  if(!userData) {
    navigate(r.toppage);
  }

  return (
    <div>
      <TopBar />
      <div className="container max-w-100 mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-center mb-4">{t.pages.mypage.title}</h2>
        <p>{t.userdata.uid}: {userData.uid}</p>
        <p>{t.userdata.username}: {userData.username}</p>
        <p>{t.userdata.email}: {userData.email}</p>
        <button onClick={handleLogout} className="w-auto text-red-500 p-2 mb-2 rounded hover:bg-red-500 hover:text-white cursor-pointer">{t.pages.mypage.go_signout}</button>
      </div>
    </div>
  );
};

export default Mypage;

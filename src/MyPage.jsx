// src/Mypage.jsx
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from './firebase';
import { signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { text as t } from './text';
import { Loading } from "./Loading";

const Mypage = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [auth, db]);

  if (!userdata) {
    return <Loading />;
  }

  return (
    <div className="container max-w-100 mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center mb-4">{t.pages.mypage.title}</h2>
      <p>{t.userdata.uid}: {userdata.uid}</p>
      <p>{t.userdata.username}: {userdata.username}</p>
      <p>{t.userdata.email}: {userdata.email}</p>
      <button onClick={handleLogout} className="w-auto text-red-500 p-2 mb-2 rounded hover:bg-red-500 hover:text-white cursor-pointer">{t.pages.mypage.go_signout}</button>
    </div>
  );
};

export default Mypage;

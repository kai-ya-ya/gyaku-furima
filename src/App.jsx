// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db } from './firebase';
import MyPage from "./MyPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  console.log('App useEffect: Subscribing to auth state changes.');
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log('Auth state changed! currentUser:', currentUser); // これが重要
    setUser(currentUser);
    setLoading(false);
  });
  return () => {
    console.log('App useEffect: Unsubscribing from auth state changes.');
    unsubscribe();
  };
}, [auth]);

  if (loading) {
    return <div>Loading authentication state...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={user ? <MyPage user={user} /> : <Navigate to="/signin" />} />
        <Route path="*" element={<Navigate to={user ? "/mypage" : "/signin"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

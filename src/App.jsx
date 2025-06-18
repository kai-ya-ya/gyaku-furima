// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyPage from "./MyPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import TopPage from "./TopPage";
import Sell from "./Sell";
import Item from "./Item";
import { UserProvider } from './contexts/UserContext';
import { route as r } from "./route";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={r.toppage} element={<TopPage />} />
          <Route path={r.signin} element={<SignIn />} />
          <Route path={r.signup} element={<SignUp />} />
          <Route path={r.mypage} element={<MyPage />} />
          <Route path={r.sell} element={<Sell />} />
          <Route path={r.item} element={<Item />} />
          <Route path="*" element={<Navigate to={ r.toppage} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

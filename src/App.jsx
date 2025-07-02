// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "draft-js/dist/Draft.css";

import { UserProvider } from "@contexts";
import { MyPage, SignIn, SignUp, TopPage, Sell, Sell_AI, Item, Search } from "@pages";
import { t, s, r, img } from "@res";

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
          <Route path={r.sell_ai} element={<Sell_AI />} />
          <Route path={r.item} element={<Item />} />
          <Route path={r.search} element={<Search />} />
          <Route path="*" element={<Navigate to={r.toppage} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

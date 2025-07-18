// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "draft-js/dist/Draft.css";

import { UserProvider } from "@contexts/UserContext";
import { MyPage, SignIn, SignUp, TopPage, Sell, TermPage, FormulaPage, Search } from "@pages";
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
          <Route path={r.term} element={<TermPage />} />
          <Route path={r.formula} element={<FormulaPage />} />
          <Route path={r.search} element={<Search />} />
          <Route path="*" element={<Navigate to={r.toppage} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

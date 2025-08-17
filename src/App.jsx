// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "draft-js/dist/Draft.css";

// import { UserProvider } from "@contexts/UserContext";
import { GameProvider } from "@contexts/GameContext";
import { MyPage, SignIn, SignUp, TopPage, Sell, TermPage, FormulaPage, Search, Sandbox, GameTest } from "@pages";
import { t, s, r, img } from "@res";

function App() {
  return (
    // <UserProvider>
    <GameProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path={r.toppage} element={<TopPage />} />
          <Route path={r.signin} element={<SignIn />} />
          <Route path={r.signup} element={<SignUp />} />
          <Route path={r.mypage} element={<MyPage />} />
          <Route path={r.sell} element={<Sell />} />
          <Route path={r.term} element={<TermPage />} />
          <Route path={r.formula} element={<FormulaPage />} />
          <Route path={r.search} element={<Search />} /> */}
          {/* <Route path={r.sandbox} element={<Sandbox />} /> */}
          <Route path={r.gametest} element={<GameTest />} />
          <Route path="*" element={<Navigate to={r.gametest} />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
    // </UserProvider>
  );
}

export default App;

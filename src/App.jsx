import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Login from "./pages/Login.jsx";
import Game from "./pages/Game.jsx";
import UserInfo from "./pages/User-info.jsx";
import SignUp from "./pages/Sign-up.jsx";
import PlayGamePage from "./pages/PlayGamePage.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<PlayGamePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/user-info" element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

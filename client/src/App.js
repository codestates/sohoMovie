// import { BrowserRouter } from "react-router-dom";
import NavBar from "./page/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Mypage from "./page/mypage";
import Login from "./page/login";
import Logout from "./page/logout";
import ShoppingCart from "./page/shoppingcart";


export const App = () => {
  return (
    <>
      <Router>
        <NavBar />
          <Routes>
            <Route exact path="/" element={<Main/>} />
            <Route path="/mypage" element={<Mypage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/shoppingcart" element={<ShoppingCart/>} />
          </Routes>
      </Router>
    </>
  );
};

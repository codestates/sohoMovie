// import { BrowserRouter } from "react-router-dom";
import NavBar from "./page/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Mypage from "./page/mypage";
import AAdmin from "./page/admin";
import Login from "./page/login";
import Logout from "./page/logout";
import ShoppingCart from "./page/shoppingcart";
import Signup from "./page/signup";

export const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route path="/admin/*" element={<AAdmin/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/shoppingcart" element={<ShoppingCart/>} />
        </Routes>
      </Router>
    </>
  );
};

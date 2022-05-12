import React from "react";
// import { BrowserRouter } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import NavBar from "./Navbar";
import Mypage from "./mypage";
import Login from "./login";
import Logout from "./logout";
import ShoppingCart from "./shoppingcart";
import "./styles.css";

export default function Nav() {
  return (
      <div className="Nav-body">
        <Router>
            <NavBar />
            <Routes>
              <Route path="/" exact component={Main} />
              <Route path="/mypage" exact component={Mypage} />
              <Route path="/login" exact component={Login} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/shoppingcart" exact component={ShoppingCart} />
            </Routes>
        </Router>
      </div>
  );
}



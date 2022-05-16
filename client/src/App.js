// import { BrowserRouter } from "react-router-dom";
import NavBar from "./page/Navbar";

import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Mypage from "./page/mypage";

// import ProtectedRoute from "./page/admin";
// import AAdmin from "./page/admin";

import Login from "./page/login";
import Logout from "./page/logout";
import ShoppingCart from "./page/shoppingcart";
import Signup from "./page/signup";

import axios from "axios";
export const MyContext = createContext();

export const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);

  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  const isAuthenticated = () => {
    axios
      .get(`http://localhost:4000/auth`, { withCredentials: true })
      .then((data) => {
        if (data.status === 200) {
          setUserinfo(data.data.data.data);
          setIsLogin(true);
        }
      })
      .catch((err) => console.log("Err =>", err));
  };

  return (
    <>
      <MyContext.Provider value={{ isLogin, userinfo }}>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Main />} />
            {/* <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AAdmin />
                </ProtectedRoute>
              }
            /> */}
            <Route path="/mypage" element={<Mypage />} />
            <Route
              path="/login"
              element={<Login handleResponseSuccess={handleResponseSuccess} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </>
  );
};

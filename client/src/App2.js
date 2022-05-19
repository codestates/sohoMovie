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
import ShoppingCart from "./page/Shoppingcart";
import Signup from "./page/signup";

import axios from "axios";
export const MyContext = createContext();

export const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  console.log("userinfo=> [2]", userinfo);

  const HandleLogin = () => {
    setIsLogin(true);
  };

  const issueAccessToken = (token) => {
    setAccessToken(token);
  };
  // const issueAccessToken = (data.data.data.userinfo) => {
  //   setAccessToken(data.data.data.userinfo);
  // };
  // const handleResponseSuccess = () => {
  //   isAuthenticated();
  // };

  // const isAuthenticated = () => {
  //   axios
  //     .get(`http://localhost:4000/auth`, { withCredentials: true })
  //     .then((data) => {
  //       if (data.status === 200) {
  //         // useContext로 관리 됨 -> NavBar -> 마이페이지 적용
  //         console.log("data.data.data.userInfo [1]=>", data.data.data.userInfo);
  //         console.log("data.data.data =>", data.data.data.data);
  //         // console.log("data.data.data.data =>", data.data.data.data);
  //         setUserinfo(data.data.data.userInfo);

  //         setIsLogin(true);
  //       }
  //     })
  //     .catch((err) => console.log("Err =>", err));
  // };

  // isLogin(true) -> NavBar -> logout 버튼
  // isLogin(false) -> NavBar -> loging 버튼 / 마이페이지
  // {isLogin ? (<Mypage />)
  //  : <button onClick={handleLogout}>Logout</button>}
  const handleLogout = () => {
    axios.post(`http://localhost:4000/logout`).then((res) => {
      setUserinfo(null);
      setIsLogin(false);
    });
  };
  // useEffect 다시 공부할 것
  // useEffect(() => {
  //   // 로그인 페이지 -> 로그인 버튼 클릭 될 때마다, 이를 상태 끌어올리기를 통해 A
  //   isAuthenticated();
  // }, []);

  return (
    <>
      <MyContext.Provider
        value={{ accessToken, HandleLogin, issueAccessToken, handleLogout }}
      >
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/shoppingcart" element={<ShoppingCart />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </>
  );
};

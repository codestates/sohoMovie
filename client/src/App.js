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
  // 마이 페이지 + NavBar에서 적용 됩니다.
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);

  //1.  login.js -> handleLogin_로그인 요청(axios.post) 실행 -> 응답 : 콜백함수(handleResponseSuccess)_상태끌어올리기 실행
  //2.  App.js ->  handleResponseSuccess 실행 -> isAuthenticated() 호출
  //-> isAuthenticated_서버로 인증 요청(axios.get) 호출
  //-> 응답 : useContext-userinfo 상태 변경 [null -> 이름, 비밀번호 ]+ useContext-isLogin 상태 변경
  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  const isAuthenticated = () => {
    axios
      .get(`http://localhost:4000/auth`, { withCredentials: true })
      .then((data) => {
        if (data.status === 200) {
          // useContext로 관리 됨 -> NavBar -> 마이페이지 적용
          setUserinfo(data.data.data.data);
          setIsLogin(true);
        }
      })
      .catch((err) => console.log("Err =>", err));
  };

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
  useEffect(() => {
    // 로그인 페이지 -> 로그인 버튼 클릭 될 때마다, 이를 상태 끌어올리기를 통해 A
    isAuthenticated();
  }, []);

  return (
    <>
      <MyContext.Provider value={{ isLogin, userinfo, handleLogout }}>
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
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/shoppingcart" element={<ShoppingCart />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </>
  );
};

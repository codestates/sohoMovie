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
// import { useNavigate } from "react-router-dom";
import axios from "axios";
export const MyContext = createContext();

export const App = () => {
  // const navigate = useNavigate();
  // 마이 페이지 + NavBar에서 적용 됩니다.
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [cartMovies, setCartMovies] = useState(null);
  console.log("로그인 후 userinfo => ", userinfo);
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
          console.log("data.data.data.userInfo => ", data.data.data.userInfo);
          // useContext로 관리 됨 -> NavBar -> 마이페이지 적용
          // console.log(data.data.userInfo);
          setUserinfo(data.data.data.userInfo);
          setIsLogin(true);
        }
      })
      .catch((err) => console.log("Err =>", err));
  };

  // const handleReservation = () => {
  //   isCartMovise();
  // }

  // const isCartMovise = () => {
  //   axios.get('http://localhost:4000', {userinfo: userinfo}.then((data) => {})
  // }
  // isLogin(true) -> NavBar -> logout 버튼
  // isLogin(false) -> NavBar -> loging 버튼 / 마이페이지
  // {isLogin ? (<Mypage />)
  //  : <button onClick={handleLogout}>Logout</button>}
  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭 아이디 userinfo.user_id => ");
    axios
      .post(`http://localhost:4000/logout`, {
        user_id: userinfo.user_id,
      })
      .then((res) => {
        if (res.status === 205) {
          isLogin(false);
          setUserinfo(null);
          // navigate("/");
        }
      })
      .catch((err) => {
        console.log("delete error =>", err);
      });
  };

  // const handleLogout = () => {
  //   axios
  //     .post(
  //       `http://ec2-35-167-67-252.us-west-2.compute.amazonaws.com:4000/logout`
  //     )
  //     .then((res) => {
  //       setUserinfo(null);
  //       setIsLogin(false);
  //     });
  // };
  // useEffect 다시 공부할 것
  useEffect(() => {
    // 로그인 페이지 -> 로그인 버튼 클릭 될 때마다, 이를 상태 끌어올리기를 통해 A
    isAuthenticated();
  }, []);

  return (
    <>
      <MyContext.Provider
        value={{
          isLogin,
          setIsLogin,
          userinfo,
          setUserinfo,
          handleLogout,
          cartMovies,
          setCartMovies,
        }}
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

import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../App";
axios.defaults.withCredentials = true;

export default function Login({ handleResponseSuccess }) {
  // const { handleLogout } = useContext(MyContext);
  // const [loginInfo, setLoginInfo] = useState({
  //   user_id: "",
  //   password: "",
  // });
  // const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();

  // const handleInputValue = (key) => (e) => {
  //   setLoginInfo({ ...loginInfo, [key]: e.target.value });
  // };

  // const handleLogin = () => {
  //   if (!loginInfo.user_id || !loginInfo.password) {
  //     return setErrorMessage("아이디와 비밀번호를 입력하세요");
  //   }
  //   axios
  //     .post(`http://localhost:4000/users/login`, {
  //       user_id: loginInfo.user_id,
  //       password: loginInfo.password,
  //     })
  //     .then((res) => {
  //       console.log("document.cookie=> ", document.cookie);
  //       console.log("res => ", res);
  //       console.log("res.value => ", res.value);
  //       console.log("res.jwt => ", res.jwt);
  //       console.log("res.Cookies => ", res.Cookies);
  //       console.log("res.cookies => ", res.cookies);
  //       console.log("res.cookies.jwt => ", res.cookies.jwt);
  //       console.log("res.cookies => ", res.cookies);
  //       if (res.data.message === "로그인 성공") {
  //         console.log("res.jwt => ", res.jwt);

  //         issueAccessToken(res.data.data.accessToken);
  //         loginHandler();
  //         navigate("/");
  //       } else {
  //         return setErrorMessage("아이디 또는 비밀번호를 잘못 입력했습니다");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleLoginSignUp = () => {
    navigate("/signup");
  };

  // 아이디를 형식에 맞지 않게 입력할 경우 출력되는 에러 메세지
  const [idErrMsg, setIdErrMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // 가입된 정보가 없는 경우 에러 메세지
  const [loginErrMsg, setLoginErrMsg] = useState("");
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    password: "",
  });
  const navigate = useNavigate(); // v5 History

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const user_id_Validation = (e) => {
    const regExp = /^[a-z0-9]{4,10}$/;
    if (!regExp.test(e.target.value)) {
      setIdErrMsg("아이디 형식이 맞지 않습니다.");
    } else {
      setIdErrMsg("");
    }
  };

  const handleLogin = () => {
    const { user_id, password } = userInfo;
    if (user_id === "" || password === "") {
      setErrMsg("필수 정보입니다.");
    } else {
      setErrMsg("");
      axios
        .post(`http://localhost:4000/users/login`, {
          user_id,
          password,
        })
        .then((res) => {
          if (res.data.message === "로그인 성공") {
            handleResponseSuccess(); //App.js 상태 끌어올리기
            navigate("/"); // history.push('/');
          } else {
            return setLoginErrMsg("아이디 또는 비밀번호를 잘못 입력했습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <center className="contert">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              className="loginInput" // o
              type="text"
              placeholder="아이디"
              onChange={handleInputValue("user_id")}
              onBlur={user_id_Validation}
            />
          </div>
          <div>
            <input
              className="loginInput underLoginInput" // o
              type="password"
              placeholder="비밀번호"
              onChange={handleInputValue("password")}
            />
          </div>
          <div>
            {/* o */}
            <span className="signUpErr loginErrMsg">{errMsg}</span>
          </div>
          <div>
            <div>
              <button
                className="LoginBigBtn" //o
                type="submit"
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
          </div>
          <div>
            <button onClick={handleLoginSignUp} className="bigBtn1">
              회원가입
            </button>
          </div>
        </form>
      </center>
    </div>
  );
}

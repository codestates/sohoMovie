import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Login({ handleResponseSuccess }) {
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    password: "",
  });

  // 아이디를 형식에 맞지 않게 입력할 경우 출력되는 에러 메세지
  const [idErrMsg, setIdErrMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // 가입된 정보가 없는 경우 에러 메세지
  const [loginErrMsg, setLoginErrMsg] = useState("");

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
        .post(`http://localhost:4000/login`, {
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
      <div className="navigation"></div>
      <div className="login">
        <div className="login_wrap">
          {/* form 태크의 input 을 전송하는 이벤트(onSubmit)가 발생되면 */}
          {/* 페이지가 리로드 되는 현상이 발생한다. */}
          {/* 이를 기억한다면, 로그인 form의 input을 모두 입력하지 않았음에도 */}
          {/* onSubmit이 발생한다면, 페이지가 리로드 될 것이다. */}
          {/* 이를 막기 위해 event.preventDefault()를 적용 시켜 리로드를 방지하는 것이다 */}
          {/* https://studyingych.tistory.com/27 */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="login_title">로그인</div>
            <div className="login_user_id">
              <div className="login_input_title">아이디</div>
              <input
                onBlur={user_id_Validation} // 유효성 검사 -> idErrMsg 적성[1. 제대로 써라 2.메세지 없음]
                onChange={handleInputValue("user_id")} // 입력한대로 userInfo.id 로 입력
                className="login_input"
                type="text"
              ></input>
              {userInfo.user_id === "" ? ( // 아이디가 비어 있는지 확인
                <div className="login_warning">{errMsg}</div> // errMsg : 야! 필수라고!
              ) : (
                <div className="login_warning">{idErrMsg}</div> // 입력한 결과로 유효성 검사 후 idErrMsg 출력
              )}
            </div>
            <div className="login_password">
              <div className="login_title">비밀번호</div>
              <input
                type="password"
                onChange={handleInputValue("password")} // 유효성 필요 없음 -> 바로 userInfo로 입력
                className="login_input"
              ></input>
              {userInfo.password === "" ? (
                <div className="login_warning">{errMsg}</div>
              ) : // 입력하지 않았을 때 errMsg: "필수라고!", 입력이 됐다면, 보안상의 이유로 어떤 힌트도 제공하지 않게 null처리
              null}
            </div>
            {/* // userInfo를 모두 작성하고 로그인 버튼을 클릭했을 후, 정보 불일치로 로그인 실패했을 때 노출 될 errMsg */}
            <div className="login_errMsg">{loginErrMsg}</div>
            <div type="submit" id="lin_btnLogin" onClick={handleLogin}>
              로그인
            </div>
            {/* 회원가입 페이지 이동 /signup */}
            <div className="login_signup">
              <Link to="/signup">
                <div className="login_signup_text">회원가입</div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
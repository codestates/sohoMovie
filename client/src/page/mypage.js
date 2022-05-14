import "./styles.css";

import React, { useState, useContext } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Mypage() {
  const [errMsg, setErrMsg] = useState(""); // 공통 에러 메세지
  const [nameErrMsg, setNameErrMsg] = useState(""); // 이름 에러 메세지
  const [nameCheckMsg, setNameCheckMsg] = useState(""); //이름 확인 메세지
  const [pwErrMsg, setPwErrMsg] = useState(""); // 비밀번호 에러 메세지
  const [pwCheckErrMsg, setPwCheckErrMsg] = useState(""); // 비밀번호 확인 에러 메세지
  const [userInfo, setUserInfo] = useState({
    //! null과 빈문자열의 차이 확인 할것
    name: null,
    password: null,
    passwordCheck: null,
  }); //

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  // 이름 유효성 검사 실시
  // 이름을 고유 값으로 설정하지 않음 -> 서버로 동일여부 확인 요청 X
  // 단순하게, regExp로 유효성 검사만 실시
  const nameValidation = (e) => {
    const regExp = /^[가-힣]{3,8}$/;
    if (!regExp.test(e.target.value)) {
      setNameErrMsg("이름 형식이 맞지 않습니다.");
    } else {
      setNameErrMsg("");
    }
  };

  // 비밀번호 유효성 검사
  const passwordValidation = (e) => {
    const regExp =
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // 주의
    // 1. 이름만 수정하고, 비밀번호는 수정하지 않을 경우
    //     setPwErrMsg는 노출되는 것이 없어야 한다.
    // 2. 비밀번호를 수정 할 경우에만, setPwErrMsg 노출
    if (!e.target.value) {
      setPwErrMsg("");
    } else if (!regExp.test(e.target.value)) {
      setPwErrMsg("8자 이상, 영문, 숫자 및 특수문자를 사용하세요");
    } else {
      setPwErrMsg("");
    }
  };

  // 비밀번호 재확인 검사
  const passwordCheckValidation = (e) => {
    // 비밀번호 확인 input 값이 userInfo.password의 상태와 다를 경우 errmsg노출
    if (e.target.value !== userInfo.password) {
      setPwCheckErrMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setPwCheckErrMsg("");
    }
  };

  // 회원정보 수정 요청
  const handleChangeUserinfo = () => {
    setErrMsg("");
    //----- 서버로 보낼 수정된 정보 ---------
    const { name, password } = userInfo;
    // 패치할 정보를 담을 빈 객채를 선언한다.
    // 유저정보가 null이 아닌 경우(정보 수정) 빈객체에 키값쌍을 할당한다.
    const patchBody = {};
    if (!!name) {
      patchBody.newName = name;
    }
    if (!!password) {
      patchBody.newPassword = password;
    }

    // ---- 서버로 수정 요청 ----
    axios
      .patch("https://localhost:4000/user/upd/{user_id}")
      .then((res) => {
        console
          .log("save success", res.data) // 패치 성공과 패치된 데이터 확인
          .get("https://localhost:4000/user/{user_id}") // 패치 된 유저 정보를 서버로 부터 다시 받아온다.
          .then((res) => {
            setUserInfo(res.data); // 마이페이지의 이름이 수정된 이름으로 placeholder되어 있어야 한다.
            //! 메인 페이지로 이동 로직을 어떻게 작성할지 고민할 것
          });
      })
      .catch((err) => {
        console.log("userInfo err message: ", err);
      });
  };

  // 회원탈퇴 요청
  const handleSignOut = () => {
    axios
      .delete(`${process.env.REACT_APP_EC2_URL}/user/del/{user_id}`, {
        accept: "application/json",
      })
      .then((res) => {
        window.location.replace("/"); // 메인 페이지로 이동
        window.sessionStorage.removeItem("userInfo"); //
        window.sessionStorage.removeItem("isLogin");
        sessionStorage.clear();
      })
      .catch((err) => {
        console.log("delete error =>", err);
      });
  };

  return (
    <div>
      <div className="myp">
        <div className="myp_wrap">
          <div className="myp_title">개인정보 수정</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="myp_name">
              <div className="myp_input_title">이름</div>
              <input
                type="text"
                onBlur={nameValidation}
                onChange={handleInputValue("name")}
                className="myp_input"
                placeholder={userInfo.name}
              ></input>
              {userInfo.name === "" ? null : nameErrMsg ? (
                <div className="myp_warning">{nameErrMsg}</div>
              ) : (
                <div className="myp_ok">{nameCheckMsg}</div>
              )}
            </div>
            <div className="myp_password">
              <div className="myp_input_title">비밀번호</div>
              <input
                type="password"
                onBlur={passwordValidation}
                onChange={handleInputValue("password")}
                className="myp_input"
                placeholder="새로운 비밀번호를 입력해주세요."
              ></input>
              <div className="myp_warning">{pwErrMsg}</div>
            </div>
            <div className="myp_password">
              <div className="myp_input_title">비밀번호 확인</div>
              <input
                type="password"
                onBlur={passwordCheckValidation}
                onChange={handleInputValue("passwordCheck")}
                className="myp_input"
                placeholder="새로운 비밀번호를 입력해주세요."
              ></input>
              {userInfo.passwordCheck === "" ? (
                <div className="myp_warning">{errMsg}</div>
              ) : (
                <div className="myp_warning">{pwCheckErrMsg}</div>
              )}
            </div>
            <button onClick={handleChangeUserinfo} className="myp_save_btn">
              저장
            </button>
            <button onClick={handleSignOut} className="myp_del_btn">
              회원탈퇴
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

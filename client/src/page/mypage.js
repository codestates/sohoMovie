import "./mypage.css";

import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Mypage() {
  const navigate = useNavigate();
  const { userinfo, isLogin, setIsLogin } = useContext(MyContext);
  console.log("마이페이지 userinfo => ", userinfo);
  const [errMsg, setErrMsg] = useState(""); // 공통 에러 메세지
  const [nameErrMsg, setNameErrMsg] = useState(""); // 이름 에러 메세지
  const [nameCheckMsg, setNameCheckMsg] = useState(""); //이름 확인 메세지
  const [pwErrMsg, setPwErrMsg] = useState(""); // 비밀번호 에러 메세지
  const [pwCheckErrMsg, setPwCheckErrMsg] = useState(""); // 비밀번호 확인 에러 메세지
  const [userInfo, setUserInfo] = useState({
    //! null과 빈문자열의 차이 확인 할것
    // name: null,
    password: null,
    passwordCheck: null,
  }); //
  console.log("비번 변경 중 userInfo.password => ", userInfo.password);
  console.log(
    "비번 변경 중 userInfo.passwordCheck => ",
    userInfo.passwordCheck
  );
  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  // 이름 유효성 검사 실시
  // 이름을 고유 값으로 설정하지 않음 -> 서버로 동일여부 확인 요청 X
  // 단순하게, regExp로 유효성 검사만 실시
  // const nameValidation = (e) => {
  //   const regExp = /^[가-힣]{3,8}$/;
  //   if (!regExp.test(e.target.value)) {
  //     setNameErrMsg("이름 형식이 맞지 않습니다.");
  //   } else {
  //     setNameErrMsg("");
  //   }
  // };

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
    console.log("회원수정 후 userinfo.user_id=> ", userinfo.user_id);
    // ---- 서버로 수정 요청 ----
    axios
      .patch("http://localhost:4000/users/upd", {
        user_id: userinfo.user_id,
        password: userInfo.password,
        // headers: { userinfo: userinfo },
      })
      .then((res) => {
        // console.log("res.data.data.message => ", res.data.data.message)
        // console.log("회원 수정 후 userinfo => ", userInfo);
        // console.log("res=> ", res);
        // console.log("res.data => ", res.data);
        console.log("res.data.message => ", res.data.message);

        if (res.data.message === "회원정보수정 성공.") {
          setErrMsg("회원정보 수정이 완료되었습니다.");
        }
      })
      .catch((err) => {
        console.log("userInfo err message: ", err);
      });
  };

  // 회원탈퇴 요청
  // 서버에는 아이디만 보내고
  // 회원탈퇴성공 이라는 메세지가 들어와야 진행
  // 토큰 지워주고
  // isLogin(false)
  // 메인으로 이동
  const clickDropOut = () => {
    console.log("회원 탈퇴 할 아이디 userinfo.user_id =>", userinfo.user_id);
    axios
      .delete(`http://localhost:4000/users/del/id?id=${userinfo.user_id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("회원 탈퇴 후 변경된 userinfo => ", userinfo);
          setIsLogin(false);
          navigate("/");
        }
      });
  };

  return (
    <div className="wrapper">
      <div className="myp">
        <div className="myp_wrap">
          <div className="myp_title">개인정보 수정</div>
          <form onSubmit={(e) => e.preventDefault()}>
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
            {errMsg === "회원정보 수정이 완료되었습니다." ? (
              <div className="myp_warning">{errMsg}</div>
            ) : null}
            <div onClick={clickDropOut} className="myp_del_btn">
              회원탈퇴
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

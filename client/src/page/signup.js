import React, { useEffect, useState } from "react";
import axios from "axios";
import SignupModal from "../components/SignupModal";
// CORS요청은 기본적으로 쿠키를 설정하거나 보낼 수 없다.
// 프론트에서 axios 요청을 할 때, withCredentials를 true로 설정해서 수동으로 CORS요청에 쿠키를 넣어줘야 한다.
// 아래 코드는 axios 전역 설정을 true로 지정한 코드다.
// 참고 : https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-CORS-%EC%BF%A0%ED%82%A4-%EC%A0%84%EC%86%A1withCredentials-%EC%98%B5%EC%85%98
axios.defaults.withCredentials = true;

export default function Signup() {
  const [modal, setModal] = useState(false);
  const [errMsg, setErrMsg] = useState(""); // 공통 에러 메세지

  const [idErrMsg, setIdErrMsg] = useState(""); // id 에러 메세지
  const [idCheckMsg, setIdCheckMsg] = useState(""); // id 사용가능 메세지

  const [pwErrMsg, setpwErrMsg] = useState(""); // 비밀번호 에러 메세지
  const [pwCheckErrMsg, setpwCheckErrMsg] = useState(""); // 비밀번호 확인 에러 메세지

  const [emailErrMsg, setEmailErrMsg] = useState(""); // 이메일 에러 메세지
  const [emailCheckMsg, setEmailCheckMsg] = useState(""); // 이메일 사용가능 메세지

  const [nameErrMsg, setNameErrMsg] = useState(""); // 이름 에러 메세지
  const [nameCheckMsg, setNameCheckMsg] = useState(""); // 이름 사용가능 메세지

  const [tellErrMsg, setTellErrMsg] = useState(""); // 휴대 전화 에러 메세지
  const [tellCheckMsg, setTellCheckErrMsg] = useState(""); // 휴대 전화 사용가능 메세지

  const [userInfo, setUserInfo] = useState({
    user_id: "",
    password: "",
    rePassword: "",
    email: "",
    name: "",
    birth: "",
    tell: "",
  });

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  // 휴대전화 유효성 검사
  const tellValidation = (e) => {
    const regExp = /^[0-9\b -]{0,13}$/;
    if (!regExp.test(e.target.value)) {
      setTellErrMsg("'예: 01012345678' 숫자만 입력해주세요.");
    } else {
      setTellErrMsg("");
      setTellCheckErrMsg("소중한 정보 감사합니다.");
    }
  };

  // 아이디 유효성 검사 - 중복검사 버튼 클릭
  const user_id_Validation = (e) => {
    const { user_id } = userInfo;
    const regExp = /^[a-z0-9]{4,10}$/;
    if (!regExp.test(e.target.value)) {
      setIdErrMsg("아이디는 4~10자 영어 소문자, 숫자를 사용하세요.");
    } else {
      setIdErrMsg("");
      // 유효 조건을 통과한 닉네임일 경우 서버에 중복 검사 요청을 보님 (검색 특화 get)
      axios.get(`http://localhost:4000/users/id?id=${user_id}`).then((res) => {
        const resMessge = res.data.message;

        if (resMessge === "사용 가능한 아이디입니다.") {
          setIdErrMsg("");
          setIdCheckMsg("사용 가능한 아이디입니다.");
        } else if (resMessge === "이미 사용중인 아이디입니다.") {
          setIdErrMsg("이미 사용중인 아이디입니다.");
          setIdCheckMsg("");
        }
      });
    }
  };

  // 비밀번호 유효성 검사
  // 최소 8자~최대 16자, 대문자 1개 이상, 소문자 1개, 숫자 1개, 특수 문자 1개
  // const passwordValidation = (e) => {
  //   const regExp =
  //     // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  //   if (!regExp.test(e.target.value)) {
  //     setpwErrMsg("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
  //   } else {
  //     setpwErrMsg("");
  //   }
  // };

  // 비밀번호 재확인 검사
  const passwordCheckValidation = (e) => {
    if (e.target.value !== userInfo.password) {
      setpwCheckErrMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setpwCheckErrMsg("비밀번호가 일치합니다.");
    }
  };

  // 이메일 유효성 검사
  const emailValidation = (e) => {
    const regExp = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (!regExp.test(e.target.value)) {
      setEmailErrMsg("이메일 형식이 맞지 않습니다.");
    } else {
      setEmailErrMsg("");
      setEmailCheckMsg("사용 가능한 이메일입니다.");
    }
  };

  // 이름 유효성 검사
  const nameValidation = (e) => {
    const regExp = /^[가-힣]{3,8}$/;
    if (!regExp.test(e.target.value)) {
      setNameErrMsg("이름 형식이 맞지 않습니다.");
    } else {
      setNameErrMsg("");
      setNameCheckMsg(`${userInfo.name}님 환영합니다.`);
    }
  };

  // 회원가입
  const handleSignup = () => {
    const { user_id, email, password, rePassword, name, birth, tell } =
      userInfo;
    if (
      !user_id ||
      !email ||
      !password ||
      !rePassword ||
      !name ||
      !birth ||
      !tell ||
      !name
    ) {
      setErrMsg("필수 정보입니다.");
      setpwErrMsg("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    } else {
      setErrMsg("");
      axios
        .post("http://localhost:4000/users/signup", {
          user_id: user_id,
          email: email,
          password: password,
          name: name,
          birth: birth,
          tell: tell,
        })
        .then((res) => {
          console.log("success");
          setModal(!modal);
        })
        .catch((err) => {
          console.log("err message =>", err);
        });
    }
  };

  // useEffect(() => {
  //   const { tell } = userInfo;
  //   if (userInfo.tell.length === 10) {
  //     setUserInfo({
  //       tell: tell.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
  //     });
  //   } else if (userInfo.tell.length === 13) {
  //     setUserInfo({
  //       tell: tell
  //         .replace(/-/g, "")
  //         .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
  //     });
  //   }
  // }, [userInfo]);

  return (
    <div>
      <div className="signup">
        <div className="signup_wrap">
          <div className="signup_title">회원가입</div>
          <div className="signup_user_id">
            <div className="signup_input_title">아이디</div>
            <input
              type="text"
              onChange={handleInputValue("user_id")}
              onBlur={user_id_Validation}
              className="signup_input"
            ></input>
            {userInfo.user_id === "" ? (
              <div className="signup_warning">{errMsg}</div> // "필수 정보입니다."
            ) : idErrMsg ? (
              <div className="signup_warning">{idErrMsg}</div>
            ) : (
              // "아이디는 4~10자 영어 소문자, 숫자를 사용하세요."
              // "이미 사용중인 아이디입니다."
              <div className="signup_ok">{idCheckMsg}</div> // "사용 가능한 아이디입니다."
            )}
          </div>
          <div className="signup_password">
            <div className="signup_input_title">비밀번호</div>
            <input
              type="password"
              onChange={handleInputValue("password")}
              // onBlur={passwordValidation}
              className="signup_input"
            ></input>
            <div className="signup_warning">{pwErrMsg}</div>
          </div>
          <div className="signup_rePassword">
            <div className="signup_input_title">비밀번호 확인</div>
            <input
              type="password"
              onChange={handleInputValue("rePassword")}
              onBlur={passwordCheckValidation}
              className="signup_input"
            ></input>
            {userInfo.rePassword === "" ? (
              <div className="signup_warning">{errMsg}</div>
            ) : (
              <div className="signup_ok">{pwCheckErrMsg}</div>
            )}
          </div>
          <div className="signup_name">
            <div className="signup_input_title">이름</div>
            <input
              type="text"
              onChange={handleInputValue("name")}
              onBlur={nameValidation}
              className="signup_input"
            ></input>
            {userInfo.name === "" ? (
              <div className="signup_warning">{errMsg}</div>
            ) : nameErrMsg ? (
              <div className="signup_warning">{nameErrMsg}</div>
            ) : (
              <div className="signup_ok">{nameCheckMsg}</div>
            )}
          </div>
          <div className="signup_email">
            <div className="signup_input_title">이메일</div>
            <input
              type="email"
              onChange={handleInputValue("email")}
              onBlur={emailValidation}
              className="signup_input"
            ></input>
            {userInfo.email === "" ? (
              <div className="signup_warning">{errMsg}</div>
            ) : emailErrMsg ? (
              <div className="signup_warning">{emailErrMsg}</div>
            ) : (
              <div className="signup_ok">{emailCheckMsg}</div>
            )}
          </div>
          <div className="signup_birth">
            <div className="signup_input_title">생년월일</div>
            <input
              type="date"
              onChange={handleInputValue("birth")}
              className="signup_input"
            ></input>
          </div>
          <div className="signup_tell">
            <div className="signup_input_title">휴대전화</div>
            <input
              type="number"
              onChange={handleInputValue("tell")}
              onBlur={tellValidation}
              className="signup_input"
            ></input>
            {userInfo.tell === "" ? (
              <div className="signup_warning">{errMsg}</div>
            ) : tellErrMsg ? (
              <div className="signup_warning">{tellErrMsg}</div>
            ) : (
              <div className="signup_ok">{tellCheckMsg}</div>
            )}
          </div>
          <div className="signup_btn">
            <button className="signup_btn-text" onClick={handleSignup}>
              가입하기
            </button>
          </div>
        </div>
      </div>
      {modal ? <SignupModal /> : null}
    </div>
  );
}
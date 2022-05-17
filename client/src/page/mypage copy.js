import "./styles.css";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router";
import React, { useContext } from "react";
import { MyContext } from "../App";

function Mypage(prpos) {
  const { handleResponseSuccess } = useContext(MyContext);

  const location = useLocation();
  const [name, setName] = useState("");
  const [inuserinfo, setuserinfo] = useState({
    password: "",
    passwordCheck: "",
  });
  // 이름 변경 버튼
  const [btnActive, setBtnActive] = useState(true);
  // 비밀번호 변경 버튼
  const [passwordBtnActive, setPasswordBtnActive] = useState();

  const nameRegExp = /^[가-힣]{3,8}$/;
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const [message, setMessage] = useState({
    idMessage: "",
    passwordMessage: "",
    passwordCheckMessage: "",
    nameMessage: "",
    errorMessage: "",
  });

  const [validation, setValidation] = useState({
    idValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false,
    nameValidation: false,
    errorValidation: false,
  });

  const settingPasswordOnchange = (key) => (e) => {
    setuserinfo({ ...inuserinfo, [key]: e.target.value });

    if (key === "password") {
      if (!passwordRegExp.test(e.target.value)) {
        setMessage({
          ...message,
          passwordMessage:
            "8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다",
        });
        setValidation({ ...validation, passwordValidation: true });
      } else {
        setValidation({ ...validation, passwordValidation: false });
        setMessage({ ...message, passwordMessage: "" });
      }
    }
    if (key === "passwordCheck") {
      if (e.target.value !== inuserinfo.password) {
        setMessage({
          ...message,
          passwordCheckMessage: "비밀번호가 일치하지 않습니다",
        });
        setValidation({ ...validation, passwordCheckValidation: true });
      } else {
        setValidation({ ...validation, passwordCheckValidation: false });
        setMessage({ ...message, passwordCheckMessage: "" });
        // setPasswordBtnActive(true)
      }
    }
  };

  return (
    <div>
      <div className="myp">
        <div className="myp_wrap">
          <div className="myp_title">개인정보 수정</div>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* <div className="myp_name">
              <div className="myp_input_title">이름</div>
            </div> */}
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

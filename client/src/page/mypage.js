import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useContext } from "react";
import React, { useState } from "react";
import axios from "axios";
import { MyContext } from "../App";
axios.defaults.withCredentials = true;

export default function Mypage(props) {
  const { handleResponseSuccess } = useContext(MyContext);
  const location = useLocation();
  console.log("location=>", location);
  console.log("location.state=>", location.state);
  const navigate = useNavigate();

  const [nickname, setNickName] = useState("");
  const [btnActive, setBtnActive] = useState(true);
  const [passwordBtnActive, setPasswordBtnActive] = useState();

  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const [inuserinfo, setuserinfo] = useState({
    password: "",
    passwordCheck: "",
  });

  const [message, setMessage] = useState({
    idMessage: "",
    passwordMessage: "",
    passwordCheckMessage: "",
    nicknameMessage: "",
    errorMessage: "",
  });

  const [validation, setValidation] = useState({
    idValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false,
    nicknameValidation: false,
    errorValidation: false,
  });

  // const handleMypage = () => {
  //   axios.get(`http://localhost:4000/mypage/a/id?id=${user_id}`).then((res) => {
  //     console.log(user_id);
  //   });
  // };

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

  const settingPasswordOnClick = () => {
    const passwordMessageLength = message.passwordCheckMessage.length;
    const passwordCheckMessageLength = message.passwordMessage.length;
    const passwordLength = inuserinfo.password;
    const passwordCheckLength = inuserinfo.passwordCheckMessage;
    if (
      passwordMessageLength <= 0 &&
      passwordCheckMessageLength <= 0 &&
      passwordLength !== "" &&
      passwordCheckLength !== ""
    ) {
      axios
        .patch(`http://localhost:4000/users/upd`, {
          // user_id: userinfo.user_id,
          password: inuserinfo.password,
        })
        .then((res) => {
          if (res.status === 200) {
            handleResponseSuccess();
            setuserinfo({ password: "", passwordCheck: "" });
            window.location.replace("/mypage");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const clickDropOut = () => {
    axios
      .delete(`http://localhost:4000//users/del/id=?{user_id}`)
      .then((res) => {
        if (res.status === 200) {
          window.location.replace("/");
        }
      })
      .catch((err) => {
        console.log("delete error =>", err);
      });
  };

  const clickCancelBtn = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="myp">
        <div className="myp_wrap">
          <div className="myp_title">개인정보 수정</div>
          <div className="myp_name">
            <div className="myp_input_title">아이디</div>
            <div className="settingIdDiv">
              {/* {location.state.userinfo.user_id} */}
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="settingLabel">
                <label>비밀번호 변경</label>
                <input
                  onChange={settingPasswordOnchange("password")}
                  className="settingInput"
                  type="password"
                  value={inuserinfo.password || ""}
                />
                <button
                  type="submit"
                  disabled={passwordBtnActive}
                  onClick={settingPasswordOnClick}
                  className="passwordBtn"
                >
                  비밀번호 변경
                </button>
              </div>
              {inuserinfo.password.length > 0 &&
              validation.passwordValidation ? (
                <div>
                  <span className="settingPassErr signUpErr">
                    {message.passwordMessage}
                  </span>
                </div>
              ) : null}

              <div className="settingLabel">
                <label>비밀번호 확인</label>
                <input
                  onChange={settingPasswordOnchange("passwordCheck")}
                  className="settingInput"
                  type="password"
                  value={inuserinfo.passwordCheck || ""}
                />
              </div>
              {inuserinfo.passwordCheck.length > 0 &&
              validation.passwordCheckValidation ? (
                <div>
                  <span className="settingPassErr signUpErr">
                    {message.passwordCheckMessage}
                  </span>
                </div>
              ) : null}
            </form>
            <div onClick={clickDropOut} className=" dropOut">
              회원탈퇴
            </div>
          </div>
          <div className="settingCancel section">
            <button
              onClick={clickCancelBtn}
              className="miniBtn smallSizeFont cancelBtn"
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

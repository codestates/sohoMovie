import { Link } from "react-router-dom";

function SignupModal() {
  return (
    <div className="singupModal-background">
      <div className="singupModal">
        <div className="suM-image"></div>
        <div className="suM-text">회원가입이 완료되었습니다.</div>
        <Link to="/login">
          <button className="suM-btn">확인</button>
        </Link>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default SignupModal;
=======
export default SignupModal;
>>>>>>> 512dc62d0fbb5d2fdac02a0fee195d58bbb4ae1b

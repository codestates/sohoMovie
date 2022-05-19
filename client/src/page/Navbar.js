import "./styles.css";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavBar(props) {
  const { isLogin, userinfo, handleLogout, cartMovies, setCartMovies } =
    useContext(MyContext);
  // const history = useHistory();
  const navigate = useNavigate();
  // navigate("/");
  const handleMyPage = () => {
    navigate({
      pathname: "/myPage",
      state: { userinfo: userinfo },
    });
  };

  const handleShoppingcart = () => {
    axios
      .get("http://localhost:4000", { user_id: userinfo.user_id })
      .then((data) => {
        setCartMovies(data.movies);
      });
  };

  return (
    <nav>
      {/* SOHO_MOVIE title */}
      <Link to="/">
        <h1 id="title">
          {/* <img id="logo" src="../logo.png" alt="logo" /> */}
          <span id="name">SOHO MOVIE</span>
        </h1>
      </Link>
      {/* 로그인 성공 시 mypage, logout, shoppingcart */}
      {/* 로그아웃 시 login, signup, */}
      <div>
        {isLogin ? (
          <ul className="nav-links">
            <Link to="/mypage">
              <li onClick={handleMyPage} userinfo={userinfo}>
                my page
              </li>
            </Link>
            <Link to="/">
              <li onClick={handleLogout}>
                <a href="/"></a>logout
              </li>
            </Link>
            <Link to="/shoppingcart">
              <li onClick={handleShoppingcart}>shopping cart</li>
            </Link>
          </ul>
        ) : (
          <ul className="nav-links">
            <Link to="/login">
              <li>login</li>
            </Link>
            <Link to="/signup">
              <li>signup</li>
            </Link>
          </ul>
        )}
      </div>
      {/* <ul className="nav-links">
            <Link to="/admin">
              <li>관리자 페이지</li>
            </Link> */}
    </nav>
  );
}

// return (
//   <nav>
//     <Link to="/">
//       <h1 id="title">
//         {/* <img id="logo" src="../logo.png" alt="logo" /> */}
//         <span id="name">SOHO MOVIE</span>
//       </h1>
//     </Link>
//     <ul className="nav-links">
//       <Link to="/admin">
//         <li>관리자 페이지</li>
//       </Link>
//       <Link to="/mypage">
//         <li>my page</li>
//       </Link>
//       <Link to="/login">
//         <li>login</li>
//       </Link>
//       <Link to="/logout">
//         <li>logout</li>
//       </Link>
//       <Link to="/shoppingcart">
//         <li>shopping cart</li>
//       </Link>
//     </ul>
//   </nav>
// );
// }

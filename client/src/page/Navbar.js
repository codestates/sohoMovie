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
      <h1 id="title">
        <Link to="/" id="name">
          {/* <img id="logo" src="../logo.png" alt="logo" /> */}
          SOHO MOVIE
        </Link>
      </h1>
      {/* 로그인 성공 시 mypage, logout, shoppingcart */}
      {/* 로그아웃 시 login, signup, */}
      <div>
        {isLogin ? (
          <ul className="nav-links">
            <li onClick={handleMyPage} userinfo={userinfo}>
              <Link to="/mypage">
                my page
              </Link>
            </li>
            <li onClick={handleLogout}>
              <Link href="/" to="/">
                logout
              </Link>
            </li>
            <li onClick={handleShoppingcart}>
              <Link to="/shoppingcart">
                shopping cart
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-links">
            <li>
              <Link to="/login">
                login
              </Link>
            </li>
            <li>
              <Link to="/signup">
                signup
              </Link>
            </li>
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

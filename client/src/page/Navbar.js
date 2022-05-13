import "./styles.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">
        <h1 id="title">
          {/* <img id="logo" src="../logo.png" alt="logo" /> */}
          <span id="name">SOHO MOVIE</span>
        </h1>
      </Link>
      <ul className="nav-links">
        <Link to="/admin">
          <li>관리자 페이지</li>
        </Link>
        <Link to="/mypage">
          <li>my page</li>
        </Link>
        <Link to="/login">
          <li>login</li>
        </Link>
        <Link to="/logout">
          <li>logout</li>
        </Link>
        <Link to="/shoppingcart">
          <li>shopping cart</li>
        </Link>
      </ul>
    </nav>
  );
}

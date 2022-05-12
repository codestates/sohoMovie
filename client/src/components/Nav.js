import React from 'react';
import { Link } from 'react-router-dom';

//Nav 구현
export default function Nav() {
  return (
    <div id="nav-body">
      <div id="menu">
        <Link to="/">메인페이지</Link>
        <Link to="/">관리자페이지</Link>
        <Link to="/mypage">MY PAGE</Link>
        <Link to="/login">로그인</Link>
        <Link to="/logout">로그아웃</Link>
        <Link to="/shoppingcart">
          장바구니<span id="nav-item-counter">{1}</span>
        </Link>
      </div>
    </div>
  );
}

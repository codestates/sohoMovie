import React from 'react';
import Nav from './components/Nav.js';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <div id="header-body">
      <Link to="/">
        <h1 id="title">
          {/* <img id="logo" src="../logo.png" alt="logo" /> */}
          <span id="name">SOHO MOVIE</span>
        </h1>
      </Link>
      <Nav/>
    </div>
  );
}

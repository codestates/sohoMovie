import "./styles.css";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export default function Logout() {
  // useEffect(() => {
  //   fetchItems();
  // }, []);

  // const [items, setItems] = useState([]);

  // const fetchItems = async () => {
  //   const data = await fetch("https://fakestoreapi.com/products");
  //   const items = await data.json();
  //   setItems(items);
  // };
  return (
    <div className="shop-items">
      {/* <ol id="item-list">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/shop/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ol> */}
    </div>
  );
}

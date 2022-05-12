import "./styles.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ItemDetail({ match }) {
  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const getItem = await fetch(
      `https://fakestoreapi.com/products/${match.params.id}`
    );
    const item = await getItem.json();
    setItem(item);
    console.log(item);
  };
  return (
    <div className="item-detail">
      <h3>{item.title}</h3>
      <img src={item.image} alt="" />
    </div>
  );
}

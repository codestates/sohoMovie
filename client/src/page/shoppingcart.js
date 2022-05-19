import "./shoppingcart.css";
import React, { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../App";
import axios from "axios";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import {  useNavigate } from "react-router-dom";

export default function Shoppingcart({ handleReservation }) {
  const navigate = useNavigate();
  const { userinfo } = useContext(MyContext);
  console.log("장바구니 userinfo => ", userinfo);

  const [cartMovies, setCartMovies] = useState({});
  console.log("cartMovie : " ,cartMovies)
  console.log("title" , cartMovies.b_title)
  console.log("price" , cartMovies.b_price)
  const [checkedItems, setCheckedItems] = useState([]);
  const user_id = userinfo.user_id
  const handleGetMovies = () => {
    axios.get(`http://localhost:4000/bud/get/id?id=${user_id}`,
     { user_id: userinfo.user_id })
     .then((res) => {
       console.log("res" , res)
       console.log("res.data", res.data.data.result)
      setCartMovies(res.data.data.result);
      alert(res.data.data.result.b_title)
    });
  };
  const handleDelete = (title) => {
    axios.delete(`http://localhost:4000/bud/del/id?id=${user_id}`)
    .then((res) => {
      if (res.status === 200) {
        console.log("회원 탈퇴 후 변경된 userinfo => ", userinfo);
        setCartMovies("");
        navigate("/");
      }
    });
};
  return (
      
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title" onClick={handleGetMovies}>장바구니</div>
        <span id="shopping-cart-select-all">
          <input type="checkbox" checked="checked"></input>
          <label>전체선택</label>
        </span>
        <div id="shopping-cart-container">
          {/* {!cartMovies.length ? (
            <div id="item-list-text">장바구니에 아이템이 없습니다.</div>
          ) : ( */}
            <div id="cart-item-list">
              <li className="cart-item-body">
                <div className="cart-item-info">
                  <div className="cart-item-title">{cartMovies.b_title}</div>
                  <div className="cart-item-price">{cartMovies.b_price} 원</div>
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => {
                    handleDelete(cartMovies.title);
                  }}
                >
                  삭제
                </button>
              </li>
            </div>
          {/* )} */}
          <OrderSummary
            total={cartMovies.b_price}
            totalQty={cartMovies.b_quantity}
          />
        </div>
      </div>
    </div>
  );
}

// {
//   !cartMovies.length ? (
//     <div id="item-list-text">장바구니에 아이템이 없습니다.</div>
//   ) : (
//     <div id="cart-item-list">
//       <li className="cart-item-body">
//         <div className="cart-item-info">
//           <div className="cart-item-title">{cartMovies.title}</div>
//           <div className="cart-item-price">{cartMovies.price} 원</div>
//         </div>
//         <button
//           className="cart-item-delete"
//           onClick={() => {
//             handleDelete(cartMovies.title);
//           }}
//         >
//           삭제
//         </button>
//       </li>
//     </div>
//   );
// }

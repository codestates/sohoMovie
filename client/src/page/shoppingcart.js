import "./shoppingcart.css";
import React, { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../App";
import axios from "axios";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

export default function Shoppingcart({ handleReservation }) {
  const { userinfo } = useContext(MyContext);
  console.log("장바구니 userinfo => ", userinfo);

  const [cartMovies, setCartMovies] = useState({});
  const [checkedItems, setCheckedItems] = useState([]);

  // const handleGetMovies = () => {
  //   axios.get("cartDB", { user_id: userinfo.user_id }).then((res) => {
  //     setCartMovies(res.data);
  //   });
  // };
  const handleDelete = (title) => {
    setCartMovies("");
    //TODO: dispatch 함수를 호출하여 액션을 전달하세요.
    // setCheckedItems([]);
  };

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">장바구니</div>
        <span id="shopping-cart-select-all">
          <input type="checkbox" checked="checked"></input>
          <label>전체선택</label>
        </span>
        <div id="shopping-cart-container">
          {!cartMovies.length ? (
            <div id="item-list-text">장바구니에 아이템이 없습니다.</div>
          ) : (
            <div id="cart-item-list">
              <li className="cart-item-body">
                <div className="cart-item-info">
                  <div className="cart-item-title">{cartMovies.title}</div>
                  <div className="cart-item-price">{cartMovies.price} 원</div>
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
          )}
          <OrderSummary
            total={cartMovies.price}
            totalQty={cartMovies.quantity}
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

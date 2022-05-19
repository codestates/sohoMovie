import React, { useState, useReducer } from "react";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "./App";
import {  useNavigate } from "react-router-dom";




export default function CurrentMovie({ movie }) {
  const [totalPrice, setTotalPrice] = useState(0);
  
  const navigate = useNavigate();
  const { userinfo, isLogin, setIsLogin } = useContext(MyContext);
  const {
    title,
    medium_cover_image,
    rating,
    runtime,
    summary,
    times,
    quantity,
    price
  } = movie;

  const [input, dispatch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      quantity: "",
      date: "",
      time: "",
    }
  );

  console.log("input => ", input);

  // const axiosSubmit = () => {
  //   axios.post(`http://localhost:4000/bud/add`, {

  //   })
  // }

  const handleChangeValue = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setTotalPrice(input.b_quantity * 12000)

    dispatch({ [inputName]: inputValue });
  };
  const onSubmit = (event) => {
    // axios.
    console.log(
      "submiy btn => ",
      `---Data---
      user_id:${"dfd"}
      b_title:${title}
      b_date: ${input.date}
      b_time: ${input.time}
      b_quantity: ${input.b_quantity}
      b_price: ${totalPrice}

      `
    );
    axios.post(`http://localhost:4000/bud/add`, {
      user_id: userinfo.user_id,
      b_title: `${title}`,
      b_date: `${input.date}`,
      b_time: `${input.time}`,
      b_quantity: `${input.b_quantity}`,
      b_price: `${totalPrice}`,
    }).then((res) => {
      if (!res) {
        console.log("장바구니담기오류 ")
      } else {
        navigate("/shoppingcart");
      }
    })
    .catch((err) => {
      console.log(err);
    });

    event.preventDefault();
  };

  return movie.length === 0 ? (
    <div className="empty">↑ ↑ ↑ 영화를 선택해 주세요 ↑ ↑ ↑</div>
  ) : (
    <>
      <div className="bottom-current-side">
        <div className="current-movie">
          <img className="thumbnail" src={medium_cover_image} alt={title} />
          <div className="detail">
            {/* 영화타이틀 */}
            <h2 className="title">{title}</h2>
            <form onSubmit={onSubmit}>
              <label>티켓 수량 :</label>
              {input.b_quantity}매
              <br />
              <input
                type="number"
                min={1}
                name="b_quantity"
                value={input.b_quantity}
                onChange={handleChangeValue}
              />
              <br />
              <label>날짜 선택 :</label>
              {input.date}
              <br />
              <input
                type="date"
                name="date"
                value={input.date}
                onChange={handleChangeValue}
              />
              <br />
              <label>회차 선택:</label>
              {input.time}
              <br />
              <select name="time" onChange={handleChangeValue}>
                {times.map((time) => (
                  <option key={time + "time"} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              
              <br />
              <div>가 격 :{totalPrice}<br/>장 당 12000원</div>
              
              <button type="submit">Submit</button>
            </form>
          </div>
          <div></div>
          <p>내용</p>
          <p className="description">{summary}</p>
        </div>
      </div>
    </>
  );
}

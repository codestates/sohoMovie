import React, { useReducer } from "react";

// TODO: 하드코딩된 데이터를 동적으로 렌더링 되도록 다시 작성합니다.

export default function CurrentMovie({ movie }) {
  const { title, medium_cover_image, rating, runtime, summary , times, quantity} = movie;

  const [input, dispatch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      quantity: "",
      date: "",
      time: ""
    }
  );

  console.log(input)

  const handleChangeValue = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    dispatch({ [inputName]: inputValue });
  };
  const onSubmit = event => {

    // axios.
    console.log(
      `---Data---
      user_id:${'dfd'}
      b_title:${title}
      b_date: ${input.date}
      b_time: ${input.time}
      b_quantity: ${input.b_quantity}
      `
    );
    event.preventDefault();
  };

  return movie.length === 0 ? 
  (<div className="empty">↑ ↑ ↑ 영화를 선택해 주세요 ↑ ↑ ↑</div>)
  : (
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
                            <option
                              key={time + "time"}
                              value={time}
                            >{time}</option>
              ))}
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
          </div>
              <div>
              
              </div>
            <p>내용</p>
            <p className="description">{summary}</p>
        </div>
      </div>
    </>
  )
}

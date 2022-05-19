import "./styles.css";
import React, { useState, useEffect } from "react";
import MovieRankList from "./../MovieRankList";
import CurrentMovie from "./../CurrentMovie";

// 기본값으로 주어지는 영화 목록


export default function Main() {
  const [currentMovie, setCurrentMovie] = useState([]);
  const handleCardClick = (movie) => {
    console.log("영화 목록을 클릭했군요!");
    // TODO: 현재 선택한 영화가 바뀌어야 합니다
    setCurrentMovie(movie);
  };

  return (
    <div className="shop-items">
      <div className="shop-body">
        <MovieRankList handleCardClick={handleCardClick} />
        <CurrentMovie movie={currentMovie} />
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import Header from './Header';
import MovieRankList from './MovieRankList';
import CurrentMovie from './CurrentMovie';
import { getMovies } from './api/movieDataApi';

// 기본값으로 주어지는 영화 목록은 다음을 이용하세요.
import mockMovie from './static/mockMovie';

export const App = () => {
  const handleCardClick = () => {
    console.log('영화 목록을 클릭했군요!');
    // TODO: 현재 선택한 영화가 바뀌어야 합니다
  };

  global.handleCardClick = handleCardClick; // 이 코드는 테스트를 위한 코드입니다. 실행에는 지장이 없지만, 지우면 테스트를 통과하지 않을 수 있습니다.

  return (
    <>
      <div className='header'>
        <Header />
      </div>
      <div className='body'>
        <CurrentMovie />
        <MovieRankList movies={[]} />
      </div>
    </>
  );
};

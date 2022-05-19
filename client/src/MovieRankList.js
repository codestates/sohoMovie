import MovieRankListEntry from "./MovieRankListEntry";
import movies from "./static/mockMovie";
// import CurrentGenre from './CurrentGenre';
// import MovieRankListPagination from './MovieRankListPagination';

export default function MovieRankList({ handleCardClick }) {
  return (
    <div className="top-movie-list">
      {/*
        Advanced Challenge: CurrentGenre, MovieRankListPagination 유닛 테스트를 통과합니다.
          <CurrentGenre currentGenre={'genre?'} />
          <MovieRankListPagination params={{}} setParams={() => {}} /> 
      */}
      <ul className="card-list">
        {/*
        TODO: props로 받아온 영화정보의 갯수 만큼 MovieRankListEntry를 렌더링합니다.
          (1) props로 빈 배열을 받은 경우, MovieRankListEntry가 존재하지 않고 `영화 목록이 비었습니다` 라는 문구를 표시해야 합니다. 조건부 렌더링을 활용해 보세요.
          (2) 각 MovieRankListEntry는 고유의 key를 가지고 있어야 합니다.
          (3) 각 MovieRankListEntry 컴포넌트를 클릭하면 handleCardClick 메소드가 실행됩니다.
      */}

        {movies.length > 0
          ? movies.map((movie) => (
              <MovieRankListEntry
                key={movie.id}
                movie={movie}
                handleCardClick={handleCardClick}
              />
            ))
          : 
          <li className="empty">"영화 목록이 비었습니다"</li>
          }
      </ul>
    </div>
  );
}

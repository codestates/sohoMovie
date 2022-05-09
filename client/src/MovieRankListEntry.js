// TODO: 하드코딩된 데이터를 동적으로 렌더링 되도록 다시 작성합니다.

export default function MovieRankListEntry() {
  return (
    <div className='card'>
      <div style={{ flex: 3 }}>
        <img width='100%' height='100%' src='https://yts.lt/assets/images/movies/avengers_infinity_war_2018/medium-cover.jpg' />
      </div>
      <div style={{ flex: 7 }}>
        <h3 className='title'>Avengers: Infinity War</h3>
        <p className='rating'>Rating: 8.5</p>
        <p className='running-time'>Running Time: 149 min</p>
        <p>Genres</p>
        <div className='tag-list'>
          <div className='tag'>Action</div>
          <div className='tag'>Adventure</div>
        </div>
      </div>
    </div>
  );
}

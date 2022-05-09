// TODO: 하드코딩된 데이터를 동적으로 렌더링 되도록 다시 작성합니다.

export default function MovieRankListEntry({ movie, handleCardClick }) {
  const { title, rating, runtime, genres, medium_cover_image } = movie;
  return (
    <div
      className="card"
      onClick={() => {
        handleCardClick(movie);
      }}
    >
      <div style={{ flex: 3 }}>
        <img width="100%" height="100%" src={medium_cover_image} />
      </div>
      <div style={{ flex: 7 }}>
        <h3 className="title">{title}</h3>
        <p className="rating">Rating: {rating}</p>
        <p className="running-time">Running Time: {runtime} min</p>
        <p>Genres</p>
        <div className="tag-list">
          {genres.map((genre) => (
            <div className="tag" key={genre}>
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

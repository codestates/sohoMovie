// TODO: 하드코딩된 데이터를 동적으로 렌더링 되도록 다시 작성합니다.

export default function MovieRankListEntry({ movie, handleCardClick }) {
  const { title, rating, runtime, tag, medium_cover_image } = movie;
  return (
    <li
      className="card"
      onClick={() => {
        handleCardClick(movie);
      }}
    >
      <div>
        <img src={medium_cover_image} />
      </div>
      <div>
        <h3 className="title">{title}</h3>
        <p className="rating">Rating: {rating}</p>
        <p className="running-time">Running Time: {runtime} min</p>
        <div className="tag-list">
          {tag.map((genre) => (
            <div className="tag" key={genre}>
              {genre}
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}

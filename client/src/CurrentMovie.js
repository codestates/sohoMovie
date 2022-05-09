// TODO: 하드코딩된 데이터를 동적으로 렌더링 되도록 다시 작성합니다.

export default function CurrentMovie({ movie }) {
  if (!movie) {
    return "영화를 선택하세요";
  }
  const { title, medium_cover_image, rating, runtime, description_full } =
    movie;
  return (
    <>
      <div className="left-current-side">
        <div className="current-movie">
          <h1 className="title">{title}</h1>
          <img className="thumbnail" src={medium_cover_image} alt={title} />
          <p className="rating">rating : {rating}</p>
          <p className="running-time">runtime : {runtime}min</p>
          <p>description</p>
          <p className="description">{description_full}</p>
        </div>
      </div>
    </>
  );
}

// TODO: 하드코딩된 데이터를 동적으로 렌더링 되도록 다시 작성합니다.

export default function CurrentMovie({ movie }) {
  if (movie.length === 0) {
    return "영화를 선택하세요";
  }
  const { title, medium_cover_image, rating, runtime, description_full } = movie;
  return (
    <>
      <div className="bottom-current-side">
        <div className="current-movie">
            <img className="thumbnail" src={medium_cover_image} alt={title} />
          <div className="detail">
              {/* 영화타이틀 */}
              <h2 className="title">{title}</h2>
            
              {/* 가격정보 모듈 */}
              <h2 className="price">5000 원{/*price*/}</h2>

              {/* 홍보문구 모듈 */}
              <div>
              
              </div>
            

            {/* <p className="rating">rating : {rating}</p>
            <p className="running-time">runtime : {runtime}min</p> */}
          </div>
            <p>description</p>
            <p className="description">{description_full}</p>
        </div>
      </div>
    </>
  );
}

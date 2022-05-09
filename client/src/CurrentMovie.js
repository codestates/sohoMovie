// TODO: 하드코딩된 데이터를 동적으로 렌더링 되도록 다시 작성합니다.

export default function CurrentMovie() {
  return (
    <>
      <div className='left-current-side'>
        <div className='current-movie'>
          <h1 className='title'>Avengers: Infinity War</h1>
          <img
            className='thumbnail'
            src='https://yts.lt/assets/images/movies/avengers_infinity_war_2018/medium-cover.jpg'
            alt='thumbnail'
          />
          <p className='rating'>rating : 8.5</p>
          <p className='running-time'>runtime : 149min</p>
          <p>description</p>
          <p className='description'>
            As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new
            danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity
            Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers
            have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.
          </p>
        </div>
      </div>
    </>
  );
}

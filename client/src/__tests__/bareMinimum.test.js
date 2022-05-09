import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import nock from 'nock';

import MovieRankListEntry from '../MovieRankListEntry';
import MovieRankList from '../MovieRankList';
import CurrentMovie from '../CurrentMovie';
import * as Api from '../api/movieDataApi';
// import { result as mockData } from './mockMovieForAdvanced';
import { App } from '../App';

// 테스트 통과를 위해 mockup 데이터를 참고하세요.
import mockMovie from '../static/mockMovie';

describe('MovieRankListEntry unit test', () => {
  let container;

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<MovieRankListEntry movie={mockMovie[0]} />, container);
    });
  });

  afterAll(() => {
    document.body.removeChild(container);
    container = null;
    cleanup();
  });

  test('movie props로 전달받은 영화의 제목을 표현해야 합니다.', () => {
    expect(container.querySelector('.title').innerHTML).toEqual(mockMovie[0].title);
  });

  test('movie props로 전달받은 영화의 평점을 표현해야 합니다.', () => {
    expect(container.querySelector('.rating').innerHTML.includes(mockMovie[0].rating.toString())).toEqual(true);
  });

  test('movie props로 전달받은 영화의 러닝 타임을 표현해야 합니다.', () => {
    expect(container.querySelector('.running-time').innerHTML.includes(mockMovie[0].runtime.toString())).toEqual(true);
  });

  test('movie props로 전달받은 영화의 장르를 표현해야 합니다.', () => {
    expect(container.querySelectorAll('.tag').length).toEqual(mockMovie[0].genres.length);
  });

  test('여러 영화 장르 렌더링 시, genre를 key로 지정해야 합니다.', async function () {
    const cards = container.querySelectorAll('.tag');

    for (let i = 0; i < Object.keys(cards).length; i++) {
      let genre;
      cards[i].addEventListener('mouseover', (e) => {
        genre = e.target[Object.keys(e.target)[0]].key;
      });

      cards[i].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      expect(genre).toEqual(mockMovie[0].genres[i].toString());
    }
  });
});

describe('MovieRankList unit test', () => {
  let container;
  const params = { limit: 10, page: 1, genre: null };

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<MovieRankList params={params} movies={[]} />, container);
    });
  });

  afterAll(() => {
    document.body.removeChild(container);
    container = null;
    cleanup();
  });
  test('movies props로 빈 배열을 전달받은 경우, MovieRankListEntry가 존재하면 안 됩니다.', () => {
    expect(container.querySelectorAll('.card').length).toEqual(0);
  });

  test('movies props로 빈 배열을 전달받은 경우, 영화 목록 대신 "영화 목록이 비었습니다"라는 문구를 표시해야 합니다.', () => {
    expect(container.querySelector('.right-movie-list').innerHTML.includes('영화 목록이 비었습니다')).toEqual(true);
  });

  test('movies props에 전달된 영화정보의 개수만큼 MovieRankListEntry를 렌더링 해야 합니다.', () => {
    act(() => {
      ReactDOM.render(<MovieRankList params={params} movies={mockMovie} />, container);
    });
    expect(container.querySelectorAll('.card').length).toEqual(2);
  });

  test('MovieRankListEntry를 여러 개 렌더링할 때, 고유의 key를 가지고 있어야 합니다.', () => {
    act(() => {
      ReactDOM.render(<MovieRankList params={params} movies={mockMovie} />, container);
    });

    const cards = container.querySelectorAll('.card');
    let id;

    for (let i = 0; i < Object.keys(cards).length; i++) {
      cards[i].addEventListener('mouseover', (e) => {
        id = e.target[Object.keys(e.target)[0]].return.key;
      });
      cards[i].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      expect(id).toEqual(mockMovie[i].id.toString());
    }
  });
});

describe('CurrentMovie unit test', () => {
  let container;
  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<CurrentMovie movie={mockMovie[0]} />, container);
    });
  });

  afterAll(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
    cleanup();
  });

  test('movie props로 전달받은 현재 영화의 제목을 표현해야 합니다.', () => {
    expect(container.querySelector('.title').innerHTML).toEqual(mockMovie[0].title);
  });

  test('movie props로 전달받은 현재 영화의 포스터(medium 사이즈)를 표현해야 합니다.', () => {
    expect(container.querySelector('img').src).toEqual(mockMovie[0].medium_cover_image);
  });

  test('movie props로 전달받은 현재 영화의 평점을 표현해야 합니다.', () => {
    expect(container.querySelector('.rating').innerHTML.includes(mockMovie[0].rating.toString())).toEqual(true);
  });

  test('movie props로 전달받은 현재 영화의 러닝 타임을 표현해야 합니다.', () => {
    expect(container.querySelector('.running-time').innerHTML.includes(mockMovie[0].runtime.toString())).toEqual(true);
  });

  test('movie props로 전달받은 현재 영화의 설명을 표현해야 합니다.', () => {
    expect(container.querySelector('.description').innerHTML).toEqual(mockMovie[0].description_full);
  });

  test('영화 정보를 movie props로 전달하지 않으면, "영화를 선택하세요"라는 메시지를 표시해야 합니다.', () => {
    act(() => {
      ReactDOM.render(<CurrentMovie movie={null} />, container);
    });
    expect(container.innerHTML.includes('영화를 선택하세요')).toEqual(true);
  });

  test('영화 정보를 movie props로 전달하지 않아도 렌더링 시 에러가 나지 않아야 합니다.', () => {
    expect(() => {
      ReactDOM.render(<CurrentMovie movie={null} />, container);
    }).not.toThrow();
  });
});
describe('App integration test', () => {
  const result = [
    { id: 8462, url: 'https://yts.lt/movie/avengers-infinity-war-2018', title: 'Avengers: Infinity War', year: 2018, rating: 8.5, runtime: 149, genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Sci-Fi'], summary: 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.', description_full: 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.', small_cover_image: 'https://yts.lt/assets/images/movies/avengers_infinity_war_2018/small-cover.jpg', medium_cover_image: 'https://yts.lt/assets/images/movies/avengers_infinity_war_2018/medium-cover.jpg', large_cover_image: 'https://yts.lt/assets/images/movies/avengers_infinity_war_2018/large-cover.jpg' }, // eslint-disable-line
    { id: 13106, url: 'https://yts.lt/movie/avengers-endgame-2019', title: 'Avengers: Endgame', year: 2019, rating: 8.5, runtime: 181, genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'], summary: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...", description_full: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...", small_cover_image: 'https://yts.lt/assets/images/movies/avengers_endgame_2019/small-cover.jpg', medium_cover_image: 'https://yts.lt/assets/images/movies/avengers_endgame_2019/medium-cover.jpg', large_cover_image: 'https://yts.lt/assets/images/movies/avengers_endgame_2019/large-cover.jpg' }, // eslint-disable-line
    { id: 7548, url: 'https://yts.lt/movie/den-of-thieves-2018', title: 'Den of Thieves', year: 2018, rating: 7, runtime: 148, genres: ['Action', 'Crime', 'Drama', 'Mystery', 'Thriller'], summary: "A gritty L.A crime saga which follows the intersecting and often personally connected lives of an elite unit of the LA County Sheriff's Dept. and the state's most successful bank robbery crew as the outlaws plan an impossible heist on the Federal Reserve Bank of downtown Los Angeles.", description_full: "A gritty L.A crime saga which follows the intersecting and often personally connected lives of an elite unit of the LA County Sheriff's Dept. and the state's most successful bank robbery crew as the outlaws plan an impossible heist on the Federal Reserve Bank of downtown Los Angeles.", small_cover_image: 'https://yts.lt/assets/images/movies/den_of_thieves_2018/small-cover.jpg', medium_cover_image: 'https://yts.lt/assets/images/movies/den_of_thieves_2018/medium-cover.jpg', large_cover_image: 'https://yts.lt/assets/images/movies/den_of_thieves_2018/large-cover.jpg' } // eslint-disable-line
  ];

  let scope;
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    nock.cleanAll();
  });

  afterAll(() => {
    scope.done();
  });

  test('현재 선택한 영화와 영화 목록을 React state로 다뤄야 합니다.', (done) => {
    const useStateSpy = jest.spyOn(React, 'useState');
    render(<App />);

    expect(useStateSpy).toBeCalled();
    expect(useStateSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
    useStateSpy.mockRestore();
    done();
  });

  test('영화 목록 클릭 시, 현재 영화정보를 업데이트해야 합니다.', async () => {
    const { container, findAllByText } = render(<App />);
    const runningTimes = await findAllByText(/running time/i);
    const cards = container.querySelectorAll('.card');
    expect(runningTimes.length).toBe(cards.length);

    for await (const card of cards) {
      const title = card.querySelector('.title');
      userEvent.click(card);
      const currentMovieContainer = container.querySelector('.current-movie');
      waitFor(() => expect(currentMovieContainer.querySelector('.title').textContent).toBe(title.textContent));
    }
  });

  test('import한 mockMovie 대신, movieDataApi.js 앤드포인트로부터 영화 목록을 직접 응답받아 이용합니다.', async () => {
    scope = nock('https://okie249pmk.execute-api.ap-northeast-2.amazonaws.com')
      .get('/movies')
      .times(3)
      .reply(200, result)
      .get('/movies')
      .query({ limit: 10, page: 1 })
      .times(3)
      .reply(200, result);

    const json = await Api.getMovies();
    expect(json).toEqual(result);
    const ajaxCallCount = scope.interceptors[0].interceptionCounter;
    expect(ajaxCallCount).toEqual(1); // ajax call이 1회 발생
    expect(scope.interceptors[0].statusCode).toEqual(200);
  });
});

import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, waitFor, fireEvent } from '@testing-library/react';
import nock from 'nock';

import MovieRankList from '../MovieRankList';
import { result as mockData } from './mockMovieForAdvanced';
import { App } from '../App';

// 테스트 통과를 위해 mockup 데이터를 참고하세요.
// import mockMovie from '../mockMovie';
import getQueryString from '../api/getQueryString';
import MovieRankListPagination from '../MovieRankListPagination';
import CurrentGenre from '../CurrentGenre';

describe('getQueryString unit test', () => {
  test('limit이 3, page가 2, genre가 null일 때, 유효한 쿼리 파라미터를 리턴해야 합니다.', () => {
    const params = { limit: 3, page: 2, genre: null };
    const result = getQueryString(params);
    const questionMark = result.slice(0, 1);
    const splitResult = result.slice(1).split('&');
    expect(questionMark).toBe('?');
    expect(splitResult).toContain(`limit=3`);
    expect(splitResult).toContain(`page=2`);
    expect(splitResult.filter((el) => /genre/.test(el)).length).toBe(0);
  });

  test('limit이 5, page가 999, genre가 Sci-fi일 때, 유효한 쿼리 파라미터를 리턴해야 합니다.', () => {
    const params = { limit: 3, page: 999, genre: 'Sci-Fi' };
    const result = getQueryString(params);
    const questionMark = result.slice(0, 1);
    const splitResult = result.slice(1).split('&');
    expect(questionMark).toBe('?');
    expect(splitResult).toContain(`limit=3`);
    expect(splitResult).toContain(`page=999`);
    expect(splitResult).toContain(`genre=Sci-Fi`);
  });

  test('limit이 null, page가 null, genre가 Sci-fi일 때, 유효한 쿼리 파라미터를 리턴해야 합니다.', () => {
    const params = { limit: null, page: null, genre: 'Sci-Fi' };
    const result = getQueryString(params);
    const questionMark = result.slice(0, 1);
    const splitResult = result.slice(1).split('&');
    expect(questionMark).toBe('?');
    expect(splitResult.filter((el) => /limit/.test(el)).length).toBe(0);
    expect(splitResult.filter((el) => /page/.test(el)).length).toBe(0);
    expect(splitResult).toContain(`genre=Sci-Fi`);
  });
});

const sliceArrByLimitPage = (limit, page, arr) => {
  const pageStart = Number(page - 1) * Number(limit);
  const pageEnd = Number(pageStart) + Number(limit);
  return arr.slice(pageStart, pageEnd);
};

describe('MovieRankListPagination unit test', () => {
  const params = { limit: 10, page: 1, genre: null };
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  test('한 페이지 당 영화정보 개수를 정할 수 있는 select 엘리먼트를 작성합니다. (select.page-select)', () => {
    const { queryByRole } = render(<MovieRankListPagination params={params} setParams={() => {}} />);
    expect(queryByRole('combobox')).toBeInTheDocument();
    expect(queryByRole('combobox')).toHaveClass('page-select');
  });

  test('한 페이지 당 영화정보 개수를 3, 5, 10개로 정할 수 있게 option 엘리먼트를 작성합니다.', () => {
    const { queryByRole } = render(<MovieRankListPagination params={params} setParams={() => {}} />);
    const select = queryByRole('combobox');
    expect(select).toBeInTheDocument();
    const options = select.querySelectorAll('option');
    const limits = ['3', '5', '10'];
    expect(options.length).toBe(3);
    for (let i = 0; i < options.length; i += 1) {
      expect(options[i].value).toBe(limits[i]);
    }
  });

  test('select 엘리먼트를 제어할 수 있는 React state가 있어야 합니다.', (done) => {
    const useStateSpy = jest.spyOn(React, 'useState');
    render(<MovieRankListPagination params={params} setParams={() => {}} />);
    expect(useStateSpy).toBeCalled();
    expect(useStateSpy.mock.calls.length).toBeGreaterThanOrEqual(1);
    done();
  });

  test('이전 페이지 `<` 버튼, 다음 페이지 버튼 `>`이 있어야 합니다.', async () => {
    const { queryByRole } = render(<MovieRankListPagination params={params} setParams={() => {}} />);
    expect(queryByRole('button', { exact: true, name: /</ })).toBeInTheDocument();
    expect(queryByRole('button', { exact: true, name: />/ })).toBeInTheDocument();
  });
});

describe('Pagination feature test', () => {
  let scope;
  beforeAll(() => {
    /* eslint-disable */ if (!nock.isActive()) { nock.activate(); }
    scope = nock('https://okie249pmk.execute-api.ap-northeast-2.amazonaws.com')
      .get('/movies').times(3).query({ limit: 3, page: 1 }).reply(200, sliceArrByLimitPage(3, 1, mockData))
      .get('/movies').twice().query({ limit: 3, page: 2 }).reply(200, sliceArrByLimitPage(3, 2, mockData))
      .get('/movies').twice().query({ limit: 5, page: 1 }).reply(200, sliceArrByLimitPage(5, 1, mockData))
      .get('/movies').times(5).query({ limit: 10, page: 1 }).reply(200, mockData); /* eslint-enable */
  });

  afterEach(cleanup);
  afterAll(() => {
    nock.cleanAll();
    scope.done();
  });

  test('select.page-select를 이용하여 한 페이지당 영화 개수를 3, 5, 10으로 변경할 수 있어야 합니다.', async () => {
    const { container, findAllByText } = render(<App />);
    const pageSelect = container.querySelector('.page-select');
    await findAllByText(/running time/i);
    for await (const limit of [3, 5, 10]) {
      fireEvent.change(pageSelect, { target: { value: limit } });
      await findAllByText(/running time/i);
      await waitFor(() => {
        const cards = container.querySelectorAll('.card');
        expect(cards.length).toBe(limit);
      });
    }
  });

  test('`<`, `>` button을 이용하여 다음 페이지 혹은 이전 페이지로 이동할 수 있어야 합니다.', async () => {
    const { container, findAllByText, queryByRole } = render(<App />);
    const previousButton = queryByRole('button', { exact: true, name: /</ });
    const nextButton = queryByRole('button', { exact: true, name: />/ });
    const pageSelect = container.querySelector('.page-select');
    await findAllByText(/running time/i);

    let firstPage, secondPage, firstPageSecond;
    fireEvent.change(pageSelect, { target: { value: 3 } });
    await waitFor(() => {
      const cards = container.querySelectorAll('.card');
      firstPage = Array.from(cards, (el) => el.querySelector('h3.title').textContent);
      expect(cards.length).toBe(3);
    });

    fireEvent.click(nextButton);
    await findAllByText(/some-title-4/i);
    await waitFor(() => {
      const cards = container.querySelectorAll('.card');
      secondPage = Array.from(cards, (el) => el.querySelector('h3.title').textContent);
      expect(cards.length).toBe(3);
    });

    expect(firstPage).not.toEqual(secondPage);
    expect(firstPage[0]).toEqual('some-title-1');
    expect(firstPage[2]).toEqual('some-title-3');
    expect(secondPage[0]).toEqual('some-title-4');
    expect(secondPage[2]).toEqual('some-title-6');

    fireEvent.click(previousButton);
    await findAllByText(/some-title-1/i);
    await waitFor(() => {
      const cards = container.querySelectorAll('.card');
      firstPageSecond = Array.from(cards, (el) => el.querySelector('h3.title').textContent);
      expect(cards.length).toBe(3);
    });
    expect(firstPage).toEqual(firstPageSecond);
  });
});

describe('CurrentGenre unit test', () => {
  const params = { limit: 10, page: 1, genre: null };
  afterEach(cleanup);
  test('MovieRankList 컴포넌트의 자식 컴포넌트로 CurrentGenre를 작성합니다.', () => {
    const { container } = render(<MovieRankList params={params} movies={[]} />);
    const div = container.querySelector('div.current-genre');
    expect(div).toBeInTheDocument();
  });

  test('CurrentGenre 컴포넌트의 currentGenre props에 빈 값이 전달되면 "선택된 장르 : 없음"으로 표시됩니다.', () => {
    const { container } = render(<CurrentGenre currentGenre={null} />);
    const wrapper = container.querySelector('div.current-genre');
    const content = wrapper.querySelector('div');
    expect(content).toBeInTheDocument();
    expect(content.textContent.includes('없음')).toBe(true);
  });

  test('CurrentGenre 컴포넌트의 currentGenre props에 장르 metaverse가 전달되면 "선택된 장르 : metaverse"로 표시됩니다.', () => {
    const { container } = render(<CurrentGenre currentGenre={'metaverse'} />);
    const wrapper = container.querySelector('div.current-genre');
    const content = wrapper.querySelector('div');
    expect(content).toBeInTheDocument();
    expect(content.textContent.includes('metaverse')).toBe(true);
  });
});

describe('Filter by genre feature test', () => {
  let scope;
  beforeAll(() => {
    if (!nock.isActive()) {
      nock.activate();
    }
    scope = nock('https://okie249pmk.execute-api.ap-northeast-2.amazonaws.com')
      .get('/movies')
      .times(3)
      .query({ limit: 10, page: 1, genre: 'dummy-odd' })
      .reply(
        200,
        mockData.filter((_, idx) => idx % 2 !== 0)
      )
      .get('/movies')
      .times(3)
      .query({ genre: 'dummy-odd' })
      .reply(
        200,
        mockData.filter((_, idx) => idx % 2 !== 0)
      )
      .get('/movies')
      .times(3)
      .query({ limit: 10, page: 1, genre: 'dummy-even' })
      .reply(
        200,
        mockData.filter((_, idx) => idx % 2 === 0)
      )
      .get('/movies')
      .times(3)
      .query({ genre: 'dummy-even' })
      .reply(
        200,
        mockData.filter((_, idx) => idx % 2 === 0)
      )
      .get('/movies')
      .times(3)
      .query({ limit: 10, page: 1 })
      .reply(200, mockData)
      .get('/movies')
      .times(3)
      .reply(200, mockData);
  });
  afterEach(cleanup);
  afterAll(() => {
    nock.cleanAll();
    scope.done();
  });

  test('span.tag를 클릭하면, 해당 장르에 맞는 영화만 보여야 합니다.', async () => {
    const { container, findAllByText } = render(<App />);
    await findAllByText(/running time/i);

    for await (const genre of ['dummy-odd', 'dummy-even']) {
      const tagList = await findAllByText(genre);
      const genreTag = tagList[0];
      fireEvent.click(genreTag);
      await findAllByText(/running time/i);
      await waitFor(() => {
        const cards = container.querySelectorAll('.card');
        expect(cards.length).toBe(5);
      });
    }
  });
});

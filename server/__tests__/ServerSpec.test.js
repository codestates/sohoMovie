const app = require('../index');
const request = require('supertest');

describe('Bare Minimum Requirements - Server', () => {
  test('모든 영화의 정보를 요청받은 경우, 모든 영화의 정보를 응답합니다.', () => {
    return request(app)
      .get('/movies')
      .then((res) => {
        const { body } = res;
        expect(Array.isArray(body)).toEqual(true);
        expect(body.length).toEqual(10);
        return;
      });
  });
  test('모든 영화의 정보를 요청받은 경우, 상태 코드 200을 응답합니다.', () => {
    return request(app)
      .get('/movies')
      .then((res) => {
        const { status } = res;
        expect(status).toEqual(200);
        return;
      });
  });

  test('특정 id에 대한 영화정보를 요청받은 경우, 해당하는 영화의 정보를 응답합니다.', () => {
    return request(app)
      .get('/movies/8462')
      .then((res) => {
        const { body } = res;
        expect(body.id).toEqual(8462);
        expect(body.title).toEqual('Avengers: Infinity War');
        expect(body.summary).toEqual(
          'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.'
        );
        return;
      });
  });
  test('요청받은 영화의 id가 존재하지 않는경우, 상태 코드 404를 응답합니다.', () => {
    return request(app)
      .get('/movies/4639')
      .then((res) => {
        const { status } = res;
        expect(status).toEqual(404);
        return;
      });
  });
  test('요청받은 영화의 id가 존재하는 경우, 상태 코드 200를 응답합니다.', () => {
    return request(app)
      .get('/movies/4639')
      .then((res) => {
        const { status } = res;
        expect(status).toEqual(404);
        return;
      });
  });
});

describe('Advanced Challenge - Server', () => {
  describe('Pagination', () => {
    test('쿼리 파라미터 limit 값에 따라 한 번에 볼 수 있는 영화 개수를 정할 수 있어야 합니다.', () => {
      return request(app)
        .get('/movies?limit=5')
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(5);
          return request(app).get('/movies?limit=9');
        })
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(9);
          return;
        });
    });
    test('쿼리 파라미터 limit가 없는 요청은 영화 목록 10개를 응답합니다.', () => {
      return request(app)
        .get('/movies?page=1')
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(10);
          return;
        });
    });
    test('쿼리 파라미터 page가 없는 요청은 쿼리 파라미터 limit값 만큼의 영화 목록을 응답합니다.', () => {
      return request(app)
        .get('/movies?limit=5')
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(5);
          return request(app).get('/movies?limit=9');
        })
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(9);
          return;
        });
    });
    test('limit이 3인 경우, 쿼리 파라미터 page 값에 따라 보고 싶은 페이지를 정할 수 있어야 합니다.', () => {
      return request(app)
        .get('/movies?limit=3&page=1')
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(3);
          expect(body[0].id).toEqual(8462);
          expect(body[0].title).toEqual('Avengers: Infinity War');
          expect(body[0].summary).toEqual(
            'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.'
          );
          expect(body[1].id).toEqual(13106);
          expect(body[1].title).toEqual('Avengers: Endgame');
          expect(body[1].summary).toEqual(
            "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face..."
          );
          expect(body[2].id).toEqual(7548);
          expect(body[2].title).toEqual('Den of Thieves');
          expect(body[2].summary).toEqual(
            "A gritty L.A crime saga which follows the intersecting and often personally connected lives of an elite unit of the LA County Sheriff's Dept. and the state's most successful bank robbery crew as the outlaws plan an impossible heist on the Federal Reserve Bank of downtown Los Angeles."
          );
          return request(app).get('/movies?limit=3&page=3');
        })
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(3);
          expect(body[0].id).toEqual(2407);
          expect(body[0].title).toEqual('Prisoners');
          expect(body[0].summary).toEqual(
            "How far would you go to protect your family? Keller Dover is facing every parent's worst nightmare. His six-year-old daughter, Anna, is missing, together with her young friend, Joy, and as minutes turn to hours, panic sets in. The only lead is a dilapidated RV that had earlier been parked on their street. Heading the investigation, Detective Loki arrests its driver, Alex Jones, but a lack of evidence forces his release. As the police pursue multiple leads and pressure mounts, knowing his child's life is at stake the frantic Dover decides he has no choice but to take matters into his own hands. But just how far will this desperate father go to protect his family?"
          );
          expect(body[1].id).toEqual(6792);
          expect(body[1].title).toEqual('Spider-Man: Homecoming');
          expect(body[1].summary).toEqual(
            'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened.'
          );
          expect(body[2].id).toEqual(1267);
          expect(body[2].title).toEqual('Furious 7');
          expect(body[2].summary).toEqual(
            "Dominic and his crew thought they'd left the criminal mercenary life behind. They'd defeated international terrorist Owen Shaw and went their separate ways. But now, Shaw's brother, Deckard Shaw, is out killing the crew one by one for revenge. Worse, a Somalian terrorist called Jakarde and a shady government official called \"Mr. Nobody\" are both competing to steal a computer terrorism program called \"God's Eye,\" that can turn any technological device into a weapon. Torretto must reconvene with his team to stop Shaw and retrieve the God's Eye program while caught in a power struggle between the terrorist and the United States government."
          );
          return;
        });
    });
    test('잘못된 쿼리 파라미터 값을 요청받은 경우, 상태 코드 400을 응답합니다.', () => {
      // https://stackoverflow.com/a/3050561
      return request(app)
        .get('/movies?limit=codestates')
        .then((res) => {
          expect(res.status).toEqual(400);
          return;
        });
    });
    test('범위를 벗어난 파라미터 값을 요청받은 경우, 빈 배열을 응답해야 합니다.', () => {
      // https://api.gov.au/standards/national_api_standards/pagination.html#query-parameters
      return request(app)
        .get('/movies?limit=9999&page=2')
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual([]);
          return;
        });
    });
    test('범위를 벗어난 파라미터 값을 요청받은 경우, 상태 코드 200을 응답합니다.', () => {
      // https://api.gov.au/standards/national_api_standards/pagination.html#query-parameters
      return request(app)
        .get('/movies?limit=9999&page=2')
        .then((res) => {
          expect(res.status).toEqual(200);
          return;
        });
    });
  });

  describe('Filtering by genre', () => {
    test('쿼리 파라미터 genre 값과 일치하는 영화만 보여줘야 합니다.', () => {
      return request(app)
        .get('/movies?genre=Comedy')
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(1);
          expect(body[0].id).toEqual(5512);
          expect(body[0].title).toEqual('Deadpool');
          expect(body[0].summary).toEqual(
            'This is the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.'
          );
          return request(app).get('/movies?genre=Adventure');
        })
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(7);
          expect(body[0].id).toEqual(8462);
          expect(body[0].title).toEqual('Avengers: Infinity War');
          expect(body[0].summary).toEqual(
            'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.'
          );
          expect(body[1].id).toEqual(13106);
          expect(body[1].title).toEqual('Avengers: Endgame');
          expect(body[1].summary).toEqual(
            "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face..."
          );
          expect(body[2].id).toEqual(1606);
          expect(body[2].title).toEqual('Inception');
          expect(body[2].summary).toEqual(
            "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible, inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea, but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming."
          );
          return;
        });
    });
    test('쿼리 파라미터 genre와 pagination을 위한 쿼리 파라미터 limit, page를 같이 사용할 수 있어야 합니다.', () => {
      return request(app)
        .get('/movies?genre=Adventure&limit=3&page=2')
        .then((res) => {
          const { body } = res;
          expect(body.length).toEqual(3);
          expect(body[0].id).toEqual(3045);
          expect(body[0].title).toEqual('The Avengers');
          expect(body[0].summary).toEqual(
            "Nick Fury is the director of S.H.I.E.L.D., an international peace-keeping agency. The agency is a who's who of Marvel Super Heroes, with Iron Man, The Incredible Hulk, Thor, Captain America, Hawkeye and Black Widow. When global security is threatened by Loki and his cohorts, Nick Fury and his team will need all their powers to save the world from disaster which is formed by Loki and his team"
          );
          expect(body[1].id).toEqual(6792);
          expect(body[1].title).toEqual('Spider-Man: Homecoming');
          expect(body[1].summary).toEqual(
            'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened.'
          );
          expect(body[2].id).toEqual(1267);
          expect(body[2].title).toEqual('Furious 7');
          expect(body[2].summary).toEqual(
            "Dominic and his crew thought they'd left the criminal mercenary life behind. They'd defeated international terrorist Owen Shaw and went their separate ways. But now, Shaw's brother, Deckard Shaw, is out killing the crew one by one for revenge. Worse, a Somalian terrorist called Jakarde and a shady government official called \"Mr. Nobody\" are both competing to steal a computer terrorism program called \"God's Eye,\" that can turn any technological device into a weapon. Torretto must reconvene with his team to stop Shaw and retrieve the God's Eye program while caught in a power struggle between the terrorist and the United States government."
          );
          return;
        });
    });
  });
});

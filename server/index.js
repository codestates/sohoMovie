const express = require('express');
const cors = require('cors');

// HINT: 영화 데이터는 다음 movies 변수를 이용하세요
const { movies } = require('./data.json');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/movies', (req, res) => {
  // TODO:
  return res.send('TODO: ');
});

app.get('/movies/:id', (req, res) => {
  // TODO:
  return res.send('TODO: ');
});

// 테스트를 위한 코드입니다. 건드리지 마세요.
if (process.env.NODE_ENV !== 'test') {
  app.listen(3001, () => {
    console.log('server listen on 3001');
  });
}

module.exports = app;

const models = require('../models');


module.exports = {
    /**
     * 영화 목록 요청
     */
    getMovieList : async (req, res) => {
        MovieService.getMovieList()
        .then(result=>{
            if(result){
                res.status(200).send({ data: {list : result}, message: '영화 목록 호출 성공' });
            }else{
                res.status(400).send({ data: {}, message: '영화 목록 호출 실패.' });
            }
        })
        .catch((err) => {
            res.status(500).send({ data: {}, message: '서버 오류 발생', err:err });
        });
    },
    /**
     * 영화 정보요청
     * @param {string} req.query.movie_num - 영화 고유아이디
     * @param {*} res 
     */
    getMovieInfo : async (req, res) => {
        //쿼리로 넘어온 영화 고유아이디
        const movieNum = req.query.movie_num
        MovieService.getMovieInfo(movieNum)
        .then(result => {
            if(result){
                res.status(200).send({ data: {result}, message: '영화정보를 성공적으로 조회했습니다.' });
            }else{
                res.status(400).send({ data: {}, message: '영화정보 호출에 실패했습니다.' });
            }
        })
        .catch(err => {
            res.status(500).send({ data: {}, message: '서버 오류가 발생했습니다.', err:err });
        })
    }
}

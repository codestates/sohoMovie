const models = require('../models');


module.exports = {
    getMovie: async (req, res) => {
        console.log('getmovie working');
        //console.log("req.session : ", req.session);
        //console.log("req.session.userId : ", req.session.userId);
       // if(!req.session){
          res.status(400).send({data: null, message: '세션에 userId가 undefind입니다. 그래도API는 동작이 되네요'});
        }
    //     if (!req.session.userId === "admin") { // error 발생 위치. req.session이 undefined. 따라서 거기서 userId를 찾을려고 할때 에러 발생
    //         res.status(400).send({ data: null, message: '관리자 계정이 아닙니다.' });
    //     } else {
    //         const result = await Movies.findOne({

    //         }).catch((err) => res.json(err));

    //         res.status(200).json({ data: result, message: 'ok' });
    //    }
    // }
    // addMovie = async (req, res) => {

    // },
    // updmovie = async (req, res) => {

    // },
    // deleteMovie = async (req, res) => {

    // }


}
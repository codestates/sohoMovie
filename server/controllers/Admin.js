const models = require('../models');


module.exports = {
    getMovie : async (req, res) => {
        if (!req.session.userId === "admin") {
            res.status(400).send({ data: null, message: '관리자 계정이 아닙니다.' });
        } else {
            const result = await Movies.findOne({

            }).catch((err) => res.json(err));

            res.status(200).json({ data: result, message: 'ok' });
       }
    }
    // addMovie = async (req, res) => {

    // },
    // updmovie = async (req, res) => {

    // },
    // deleteMovie = async (req, res) => {

    // }


}

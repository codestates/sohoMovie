const models = require('../models');


module.exports = {
    /**
     * 회원가입
     * @param {user_id: 유저아이디, password: 비밀번호, name:이름, birth:생일, email:이메일, tell:전화번호} req.body - 요청 body
     */
    signup : async (req, res) => {
        const userData = req.body
        MemberService.signup(userData)
        .then(result=>{
            if(result){
                res.status(201).send({ data: result, message: '회원가입이 성공적으로 진행되었습니다.' });
            }else{
                res.status(400).send({ data: {}, message: '회원가입에 실패했습니다.' });
            }
        })
        .catch((err) => {
            res.status(500).send({ data: {}, message: '서버 오류 발생', err:err });
        });
    },
    /**
     * 중복아이디 조회
     * @param {string} req.query.user_id - 유저아이디
     * @param {*} res 
     */
    findDuplicateId : async (req, res) => {
        //쿼리로 넘어온 유저아이디
        const userId = req.query.user_id
        MemberService.findDuplicateId(userId)
        .then(result => {
            if(result){
                res.status(200).send({ data: {}, message: '사용할 수 있는 아이디입니다.' });
            }else{
                res.status(400).send({ data: {}, message: '아이디가 중복됩니다.' });
            }
        })
        .catch(err => {
            res.status(500).send({ data: {}, message: '서버 오류가 발생했습니다.', err:err });
        })
    },
    /**
     * 로그인
     * @param {user_id: 유저아이디, password: 비밀번호} req.body - 요청 body
     */
    login : async (req, res) => {
        const user = req.body
        MemberService.login(user)
        .then(result => {
            if(result){
                res.status(200).send({ data: {}, message: '로그인되었습니다.' });
            }else{
                res.status(400).send({ data: {}, message: '아이디/비밀번호를 확인해주세요.' });
            }
        })
        .catch(err => {
            res.status(500).send({ data: {}, message: '서버 오류가 발생했습니다.', err:err });
        })
    },
    /**
     * 로그아웃, api문서가 완성되지 않았음
     * @param {*} req 
     * @param {*} res 
     */
    logout : async (req, res) => {
        MemberService.logout(req.session.user_id)
            .then(result => {
                if(result){
                    res.status(205).send({ data: {}, message: '로그아웃이 성공적으로 완료되었습니다.' });
                }else{
                    res.status(400).send({ data: {}, message: '로그아웃에 실패하였습니다.' });
                }
            })
            .catch(err => {
                res.status(500).send({ data: {}, message: '서버 오류가 발생했습니다.', err:err });
            })
        }
}

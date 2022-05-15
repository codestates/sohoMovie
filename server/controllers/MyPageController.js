const models = require('../models');


module.exports = {
    /**
     * 회원정보보기
     * @param {string} req.params.user_id
     * @param {string} req.session.user_id
     * @param {*} res 
     */
    getMemberInfo : async (req, res) => {
        const userId = req.params.user_id
        const userIdSession = req.session.user_id
        //세션의 아이디와 path의 값이 다를 경우
        if(!(userId == userIdSession)){
            res.status(400).send({ data: {}, message: '권한이 없습니다.' });
        }else{
            MyPageService.getMemberInfo(userIdSession)
            .then(result=>{
                if(result){
                    res.status(200).send({ data: result, message: '회원정보를 성공적으로 가져왔습니다.' });
                }else{
                    res.status(400).send({ data: {}, message: '회원정보 조회에 실패하였습니다.' });
                }
            })
            .catch((err) => {
                res.status(500).send({ data: {}, message: '서버 오류 발생', err:err });
            });
        }
    },
    /**
     * 회원정보수정
     * @param {string} req.query.user_id - 유저아이디
     * @param {string} req.session.user_id
     * @param {object} req.body - 수정할 회원 정보
     * @param {*} res 
     */
    updateMemberInfo : async (req, res) => {
        const userId = req.params.user_id
        const userIdSession = req.session.user_id
        const user = req.body
        //세션의 아이디와 path의 값이 다를 경우
        if(!(userId == userIdSession)){
            res.status(400).send({ data: {}, message: '권한이 없습니다.' });
        }else{
            MyPageService.getMemberInfo(userIdSession, user)
            .then(result=>{
                if(result){
                    res.status(200).send({ data: result, message: '회원정보를 성공적으로 수정했습니다.' });
                }else{
                    res.status(400).send({ data: {}, message: '회원정보 수정에 실패하였습니다.' });
                }
            })
            .catch((err) => {
                res.status(500).send({ data: {}, message: '서버 오류 발생', err:err });
            });
        }
    },
    /**
     * 회원탈퇴
     * @param {string} req.query.user_id - 유저아이디
     * @param {string} req.session.user_id
     * @param {*} res 
     */
     leave : async (req, res) => {
        const userId = req.params.user_id
        const userIdSession = req.session.user_id
        //세션의 아이디와 path의 값이 다를 경우
        if(!(userId == userIdSession)){
            res.status(400).send({ data: {}, message: '권한이 없습니다.' });
        }else{
            MyPageService.leave(userIdSession)
            .then(result=>{
                if(result){
                    res.status(200).send({ data: result, message: '성공적으로 탈퇴하였습니다.' });
                }else{
                    res.status(400).send({ data: {}, message: '회원탈퇴에 실패하였습니다.' });
                }
            })
            .catch((err) => {
                res.status(500).send({ data: {}, message: '서버 오류 발생', err:err });
            });
        }
    }
}

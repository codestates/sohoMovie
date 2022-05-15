const models = require('../models');


module.exports = {
    /**
     * 영화정보 가져오기
     * @param {*} req 
     * @param {*} res 
     */
    getMovie : async (req, res) => {
        if (!(req.session.userId === "admin")) {
            /**
             * 세션의 유저 아이디가 admin이 아닐 경우 관리자 권한이 없는것으로 판단
             * null로 데이터를 넘기는 것보다 빈 값으로 넘기는 것이 nullpointexception을 방지하는 것에 좋음
             */
            res.status(400).send({ data: {}, message: '관리자 권한이 없습니다.' });
        } else {
            /**
             * 영화를 받아오는 작업을 마친 후 throw된 오류가 없다면 then, 오류가 있다면 catch로 핸들링
             * controller를 기준으로 Service가 작성되기 때문에 Service작업하시는 분께
             * then, catch를 사용하기 위해 Service의 함수는 async로 작성해달라고 요청
             */
            Movies.findOne().then(result=>{
                res.status(200).json({ data: result, message: 'ok' });
            })
            /**
             * throw된 에러 핸들링하는 코드
             */
            .catch((err) => res.status(500).send({
                data : {},
                message: "서버 오류가 발생하였습니다.",
                err: err
            }));
       }
    },
    /**
     * 영화정보 추가
     * @param {*} req 
     * @param {*} res 
     */
    addMovie : async (req, res) => {
        /**
         *  요청 바디부분을 객체로 받아서 movieData에 저장
         * @param req.body - {poster:포스터, title:영화제목, tag:영화태그, summary:영화 요약, price:가격, time:영화시간}
         */
        //영화 데이터 객체로 저장
        var movieData = req.body
        if(!(req.sesson.userId == "admin")){
            res.status(400).send({
                data : {},
                message: "관리자 권한이 없습니다."
            })
        }else{
            //영화데이터를 파라메터로 넣어서 함수 호출
            AdminService.addMovie(movieData)
            //callback으로 넘어온 값이 참일 때
            .then(result=>{
                if(result){
                    res.status(201).send({
                        data : {},
                        message: "입력이 완료되었습니다."
                    })
            //callback으로 넘어온 값이 거짓일 때
                }else{
                    res.status(400).send({
                        data : {},
                        message: "입력이 완료되지 않았습니다. 다시 시도해주세요."
                    })
                }
            })
            //함수에서 throw했을 때
            .catch(e=>{
                res.status(500).send({
                    data : {},
                    message: "서버 오류가 발생하였습니다."
                })  
            })
        }
    },
    /**
     * 영화정보 업데이트
     * @param {*} req 
     * @param {*} res 
     */
    updmovie : async (req, res) => {
        if(!(req.sesson.userId == "admin")){
            res.status(400).send({
                data : {},
                message: "관리자 권한이 없습니다."
            })
        }else{
            //영화 데이터 변수 저장
            const movieData = req.body
            //path로 넘어온 영화 번호 저장
            const movieNum = req.params.movie_num
            //영화 데이터와 영화 번호를 파라메터로 넣어서 함수 호출
            AdminService.updateMovie(movieData, movieNum)
            //요청에 성공했을 때
            .then(result=>{
                //callback으로 넘어온 값이 참일 때
                if(result){
                    res.status(200).send({
                        data : {},
                        message: "수정이 완료되었습니다."
                    })
                //callback으로 넘어온 값이 거짓일 때
                }else{
                    res.status(400).send({
                        data : {},
                        message: "수정이 완료되지 않았습니다. 다시 시도해주세요."
                    })
                }
            })
            //service에서 throw했을 때
            .catch(e=>{
                res.status(500).send({
                    data : {},
                    message: "서버 오류가 발생하였습니다."
                })  
            })
        }
    },
    /**
     * 영화 삭제
     * @param {*} req 
     * @param {*} res 
     */
    deleteMovie : async (req, res) => {
        if(!(req.sesson.userId == "admin")){
            res.status(400).send({
                data : {},
                message: "관리자 권한이 없습니다."
            })
        }else{
            //path 영화번호 저장
            const movieNum = req.params.movie_num
            //영화 삭제 함수 호출
            AdminService.deleteMovie(movieNum)
            //요청 성공했을 때
            .then(result=>{
                if(result){
                    res.status(200).send({
                        data : {},
                        message: "삭제가 완료되었습니다."
                    })
                }else{
                    res.status(400).send({
                        data : {},
                        message: "삭제가 완료되지 않았습니다. 다시 시도해주세요."
                    })
                }
            })
            //오류 throw했을 때
            .catch(e=>{
                res.status(500).send({
                    data : {},
                    message: "서버 오류가 발생하였습니다."
                })  
            })
        }
    }
}

const models = require('../models');


module.exports = {
    /**
     * 장바구니 데이터 가져오기
     * @param {*} req 
     * @param {*} res 
     */
    getBudcket : async (req, res) => {
        const userId = req.session.user_id
        const orderNum = req.body.order_num
        CartService.findOne(userId, orderNum)
        .then(result=>{
            if(result){
                res.status(200).send({ data: {...result}, message: '장바구니 조회 성공.' });
            }else{
                res.status(400).send({ data: {}, message: '장바구니 조회에 실패했습니다.' });
            }
        })
        .catch((err) => {
            res.status(500).send({ data: {}, message: '서버 오류 발생', err:err });
        });
    },
    /**
     * 장바구니 생성
     * @param {*} req 
     * @param {*} res 
     */
    addBucket : async (req, res) => {
        const userId = req.body.user_id
        const movieNum = req.body.movieNum
        const bDate = req.body.b_date
        const bTime = req.body.b_time
        const bQuantity = req.body.b_quantity
        const bPrice = req.body.b_price
        CartService.addBucket(bucketData)
        .then(result => {
            if(result){
                res.status(201).send({ data: {}, message: '장바구니가 생성되었습니다.' });
            }else{
                res.status(400).send({ data: {}, message: '장바구니가 생성되지 않았습니다.' });
            }
        })
        .catch(err => {
            res.status(500).send({ data: {}, message: '서버 오류가 발생했습니다.', err:err });
        })
    },
    /**
     * 장바구니 수정
     * @param {*} req 
     * @param {*} res 
     */
    updBucket : async (req, res) => {
        const bucketData = req.body
        const userId = req.params.user_id
        CartService.updateBucket(bucketData, userId)
        .then(result => {
            if(result){
                res.status(200).send({ data: {}, message: '장바구니가 수정되었습니다.' });
            }else{
                res.status(400).send({ data: {}, message: '장바구니가 수정되지 않았습니다.' });
            }
        })
        .catch(err => {
            res.status(500).send({ data: {}, message: '서버 오류가 발생했습니다.', err:err });
        })
    },
    /**
     * 장바구니 삭제
     * @param {*} req 
     * @param {*} res 
     */
    deleteBucket : async (req, res) => {
        const userId = req.params.user_id
        if(!(req.session.user_id == userId)){
            res.status(400).send({ data: {}, message: '권한이 없습니다.' });
        }else{
            CartService.deleteBucket(userId)
            .then(result => {
                if(result){
                    res.status(200).send({ data: {}, message: '장바구니가 삭제되었습니다.' });
                }else{
                    res.status(400).send({ data: {}, message: '장바구니가 삭제되지 않았습니다.' });
                }
            })
            .catch(err => {
                res.status(500).send({ data: {}, message: '서버 오류가 발생했습니다.', err:err });
            })
        }
    }


}

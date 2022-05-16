const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {

myinfo : async (req, res) => {
    const userId = req.params.user_id
    const userIdSession = req.session.user_id
    if(!(userId == userIdSession)){
        res.status(400).send({ message: '로그인정보가 잘못되었습니다.' });
    }else{
        const { user_id } = req.body;
        const data = await users.findOne({
            where: { user_id:user_id, password: password }
          });
    }
res.status(200)
}


}
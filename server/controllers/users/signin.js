const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {

signin : async (req, res) => {
  console.log("로그인도달")
  try{
    console.log("try도달")
    const { user_id, password } = req.body;

    const data = await users.findOne({
      where: { user_id:user_id, password: password }
    });
   
    if(!data) return res.status(409).json({ message: '아이디 또는 비밀번호를 잘못 입력했습니다.' }); 

    else{
      const accessToken = generateAccessToken(data.dataValues);
      sendAccessToken(res, accessToken);
      return res.status(200).json({ message: '로그인 성공' });
    }
  } catch(err){
    console.log(err)
    return null;
  }
}


}
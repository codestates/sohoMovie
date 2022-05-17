const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {

myinfo : async (req, res) => {
    console.log("회원정보가져오기")
    const userId = req.params.user_id
  
    if(!userId){
        res.status(400).send({ message: '유저아이디값이 잘못되었습니다.' });
    }else{
        const { user_id } = req.body;
        const data = await users.findOne({
            where: { user_id:user_id, password: password }
          });
    }
res.status(200)
},

updinfo: async (req, res) => {
console.log("회원정보수정")
try {
    const { user_id, password } = req.body;
    if (!user_id || !password) {
      return res.status(422).send("req값 오류");
    } else {
  
      await users.update({
        where: { user_id: user_id },
        defaults: {
      
          password: password,
   
        }
      }).then(([result, created]) => {
        if (!created) {
       console.log("created : ", created)
          return res.status(409).send("회원정보수정오류");
        } else {
          console.log("created : ", created)

          const accessToken = generateAccessToken(result.dataValues);
          console.log(accessToken)
          console.log("회원정보수정 성공")
          return res.status(201).cookie("jwt", accessToken).json({ message: '회원정보수정 성공.' })
          
         
        }
      })
    }
  } catch (err) {
    return null;
  }


},

delinfo: async (req, res) => {
console.log("회원탈퇴")




}
}
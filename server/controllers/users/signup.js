const { users } = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');

module.exports = {

  signup1: async (req, res) => {
    console.log("회원가입도입")
    try {
      const { user_id, name, password, birth, tell, email } = req.body;
      if (!user_id || !password || !tell|| !email) {
        return res.status(422).send("인풋값 오류");
      } else {
        await users.findOrCreate({
          where: { email: email },
          defaults: {
            user_id: user_id,
            name: name,
            password: password,
            birth: birth,
            tel: tell,
            email: email
          }
        }).then(([result, created]) => {
          if (!created) {
         
            return res.status(409).send("회원가입오류");
            console.log("회원가입오류")
          } else {
            const accessToken = generateAccessToken(result.dataValues);
            return res.status(201).cookie("jwt", accessToken).json({ message: '회원가입 성공.' })
            console.log("회원가입 성공")
          }
        })
      }
    } catch (err) {
      return null;
    }
  },
  signup2: async (req, res) => {
    
    console.log('signup2 working');
    //console.log("req.session : ", req.session);
    //console.log("req.session.userId : ", req.session.userId);
    // if(!req.session){
    res.status(400).send({ data: null, message: '세션에 userId가 undefind입니다. 그래도API는 동작이 되네요' });
  },

  nickcheck: async (req, res) => {
  
    console.log('nickCheck working');
    const user_id = req.query.id
    console.log(user_id)
    try {
      console.log("try입장")
      const data = await users.findOne({
        where: { user_id: req.query.id }
      })
      if (!data) {
        res.status(200).send({message: "사용 가능한 아이디입니다." })
        //db에 중복된 아이디가 없으면 {"사용할 수 있는 아이디 입니다."}

      } else {
        //db에 중복된아이디가 있으면 {"아이디가 중복됩니다."}
        res.status(200).send({message: "이미 사용중인 아이디입니다." })    }
    } catch (err) {
      console.log(err)
      return null;
    }


  }
}





const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports ={
  auth : async (req, res) => {
    //TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.
  console.log("auth index 도달")
    const accessTokenData = isAuthorized(req);
   console.log("isAu부분 : " , accessTokenData)
      if(!accessTokenData){
  
      return res.json({data: null, message: "not authorized"})
    }
    let userInfo = {
      user_id: accessTokenData.user_id,
      email: accessTokenData.email,
      name: accessTokenData.name,
      tell: accessTokenData.tel,
      createdAt: accessTokenData.createdAt,
      updatedAt: accessTokenData.updatedAt
    }
  
    res.status(200).send({data: {userInfo: userInfo}})
  
  }


}



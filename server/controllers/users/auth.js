const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports ={
  auth : async (req, res) => {
    //TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.
  
    const accessTokenData = isAuthorized(req);
   
      if(!accessTokenData){
  
      return res.json({data: null, message: "not authorized"})
    }
    let userInfo = {
      user_id: accessTokenData.user_id,
      email: accessTokenData.email,
      name: accessTokenData.name,
      tell: accessTokenData.tell,
      createdAt: accessTokenData.createdAt,
      updatedAt: accessTokenData.updatedAt
    }
  
    res.status(200).send({data: {userInfo: userInfo}})
  
  }


}



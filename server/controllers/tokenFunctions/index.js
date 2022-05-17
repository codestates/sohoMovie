require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // TODO: Access token으로 sign합니다.
    // HINT: 토큰을 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)
    console.log("gene :" ,data)
    return sign(data, process.env.ACCESS_SECRET, {expiresIn: 60 * 60 });
  },
  sendAccessToken: (res, accessToken) => {
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    console.log("send :", accessToken)
    res.cookie("jwt", accessToken)
  },
  isAuthorized: (req) => {
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    // HINT: jsonwebtoken 라이브러리의 verify 함수를 사용하여 decode된 payload를 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)

    const authorization = req.cookies.jwt;
console.log("authorization = "+authorization)
    if(!authorization){

      return null;
    }

    //const token = authorization.split(" ")[0].split("=")[1].slice(0, -1);

    try {
console.log("auth트라이도달")

      return verify(authorization, process.env.ACCESS_SECRET);
      
    } catch(err){

      console.log("err : " ,err);

    } 
  }
};
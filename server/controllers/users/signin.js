const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {

signin : async (req, res) => {

  try{
    
    const { email, password } = req.body;

    const data = await user.findOne({
      where: { user_id:user_id, password: password }
    });
   
    if(!data) return res.status(404).send('invalid user');
    else{
      const accessToken = generateAccessToken(data.dataValues);
      sendAccessToken(res, accessToken);
      return res.status(200).json({ message: 'ok' });
    }
  } catch(err){ 
    return null;
  }
}


}
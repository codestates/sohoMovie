const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = {
  myinfo: async (req, res) => {
    console.log("회원정보가져오기");
    const user_id = req.query.id;
    console.log(user_id);
    if (!user_id) {
      res.status(400).send({ message: "유저아이디값이 잘못되었습니다." });
    } else {
      const data = await users
        .findOne({
          where: { user_id: user_id },
        })
        .then((result) => {
          res.status(200).send({ data: result });
        });
    }
  },

  updinfo: async (req, res) => {
    console.log("회원정보수정");
    try {
      const { user_id, password } = req.body;
      if (!user_id || !password) {
        return res.status(422).send("req값 오류");
      } else {
        console.log("else문입장");
        await users
          .update(
            { password: password },
            {
              where: {
                user_id: user_id,
              },
            }
          )
          .then((result) => {
            if (!result) {
              console.log("result", result);
              return res.status(409).send("회원정보수정오류");
            } else {
              console.log("created : ", result);
              console.log("회원정보수정 성공");
              return res.status(200).json({ message: "회원정보수정 성공." });
            }
          });
      }
    } catch (err) {
      return null;
    }
  },

  delinfo: async (req, res) => {
    console.log("회원탈퇴");
    try {
      const user_id = req.query.id;
      console.log(user_id);
      if (!user_id) {
        return res.status(422).send("req값 오류");
      } else {
        console.log("else문입장");
        await users
          .destroy({
            where: {
              user_id: user_id,
            },
          })
          .then((result) => {
            if (!result) {
              console.log("result", result);
              return res.status(409).send("회원탈퇴오류");
            } else {
              console.log("created : ", result);

              console.log("회원탈퇴 성공");
              return res.status(200).json({ message: "회원탈퇴성공." });
            }
          });
      }
    } catch (err) {
      return null;
    }
  },
};

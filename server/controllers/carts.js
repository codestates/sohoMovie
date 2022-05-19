const { carts } = require('./../models');



module.exports = {
  
    getBudcket : async (req, res) => {
        console.log("getBucket작동")
        const user_id = req.query.id
        try {
            console.log("try입장")
            const data = await carts.findOne({
              where: { user_id: user_id }
            }).then((result) => {
                if (!result) {
                    res.status(200).send({message: "카트정보x." })                
                }else{
                    res.status(200).send({data: {result} ,message: "카트정보o" })    }
                }
          )} catch (err) {
            console.log(err)
            return null;
          }
      
      
        },
   
    addBucket : async (req, res) => {
        console.log("addBucket작동")
        try {
            const { user_id, b_title, b_time,b_date,b_price, b_quantity } = req.body;
            if (!user_id || !b_date || !b_price|| !b_date) {
              return res.status(422).send("인풋값 오류");
            } else {
   
              await carts.findOrCreate({
                where: { user_id: user_id },
                defaults: {
                  user_id: user_id,
                  b_title : b_title, 
                  b_time : b_time,
                  b_date : b_date,
                  b_price : b_price,
                   b_quantity :b_quantity
                }
              }).then(([result, created]) => {
                if (!created) {
               console.log("created : ", created)
                  return res.status(409).send("장바구니담기오류");
                } else {
                  console.log("created : ", created)
                  console.log("장바구니생성성공")
                  return res.status(201).send({ data:{result},message: '장바구니생성성공.' })
                  
                 
                }
              })
            }
          } catch (err) {
            console.log(err)
            return null;
          }
        },
   
  
    deleteBucket : async (req, res) => {
        console.log("delBucket작동")

        try {
            const user_id = req.query.id;
            console.log(user_id);
            if (!user_id) {
              return res.status(422).send("req값 오류");
            } else {
              console.log("else문입장");
              await carts
                .destroy({
                  where: {
                    user_id: user_id,
                  },
                })
                .then((result) => {
                  if (!result) {
                    console.log("result", result);
                    return res.status(409).send("장바구니삭제오류");
                  } else {
                    console.log("created : ", result);
      
                    console.log("장바구니삭제성공");
                    return res.status(200).json({ message: "장바구니삭제성공." });
                  }
                });
            }
          } catch (err) {
            return null;
          }
        }
      };

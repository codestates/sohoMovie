const router = require('express').Router();
const Cartcontroller = require('./../controllers/carts');


router.get('/get/id', Cartcontroller.getBudcket);
router.post('/add',Cartcontroller.addBucket);
router.delete('/del/id',Cartcontroller.deleteBucket);


module.exports = router;
const router = require('express').Router();
const Cartcontroller = require('./../controllers/Cart');


router.get('/', Cartcontroller.getBudcket);


//router.post('/add',controllers.addMovie);
//router.patch('/upd',controllers.updmovie);
//router.delete('/',controllers.deleteMovie);


module.exports = router;
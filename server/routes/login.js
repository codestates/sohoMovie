const router = require('express').Router();
const Logincontroller = require('./../controllers/Login');


router.post('/signup', Logincontroller.getMovie);


//router.post('/add',controllers.addMovie);
//router.patch('/upd',controllers.updmovie);
//router.delete('/',controllers.deleteMovie);


module.exports = router;
const router = require('express').Router();
const Admincontroller = require('./../controllers/Admin');


router.get('/', Admincontroller.getMovie);


//router.post('/add',controllers.addMovie);
//router.patch('/upd',controllers.updmovie);
//router.delete('/',controllers.deleteMovie);


module.exports = router;
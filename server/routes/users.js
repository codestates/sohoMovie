const router = require('express').Router();
const Logincontroller = require('../controllers/users/signup');
const authcontroller = require('../controllers/users/auth');
const signincontroller = require('../controllers/users/signin');
const myinfocontroller = require('../controllers/users/mypage');





router.post('/signup', Logincontroller.signup1);
router.post('/login', signincontroller.signin);


router.get('/id', Logincontroller.nickcheck);
router.get('/',authcontroller.auth)
router.get('/mypage',myinfocontroller.myinfo)



module.exports = router;
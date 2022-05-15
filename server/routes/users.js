const router = require('express').Router();
const Logincontroller = require('../controllers/users/signup');
const authcontroller = require('../controllers/users/auth');
const signincontroller = require('../controllers/users/signin');
const myinfocontroller = require('../controllers/users/mypage');





router.post('/signup', Logincontroller.signup1);
router.post('/signin', signincontroller.signin);

router.get('/', Logincontroller.signup2);
router.get('/id', Logincontroller.nickcheck);
router.get('/auth',authcontroller.auth)
router.get('/mypages',myinfocontroller.myinfo)



module.exports = router;
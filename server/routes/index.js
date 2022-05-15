const express = require('express');
const router = express.Router();
const adminsRouter = require('./admins');
const usersRouter = require('./users');



router.use('/admin', adminsRouter);
router.use('/users', usersRouter);
router.use('/auth', usersRouter);
router.use('/mypage',usersRouter)


module.exports = router;

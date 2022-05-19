const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const budRouter = require('./carts');



router.use('/users', usersRouter);
router.use('/auth', usersRouter);
router.use('/bud', budRouter)


module.exports = router;

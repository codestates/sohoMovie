const express = require('express');
const router = express.Router();
const adminsRouter = require('./admins');



router.use('/admins', adminsRouter);

module.exports = router;

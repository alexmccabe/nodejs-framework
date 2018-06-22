const express = require('express');
const userRouter = require('./user');
const { apiErrorHandler } = require('@/app/errorHandlers');

const router = express.Router();

router.use('/user', userRouter);
router.use(apiErrorHandler);

module.exports = router;

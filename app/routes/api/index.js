const express = require('express');
const userRouter = require('./user');
const { apiErrorHandler } = require('@/app/modules/errorHandlers');

const router = express.Router();

router.use('/user', userRouter);
router.use('/example', require('@/app/routes/example'));
router.use(apiErrorHandler);

module.exports = router;

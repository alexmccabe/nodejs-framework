const express = require('express');
const { apiErrorHandler, notFound } = require('@/app/modules/errorHandlers');

const router = express.Router();

router.use('/user', require('./user'));
router.use('/example', require('./example'));
router.use(notFound);
router.use(apiErrorHandler);

module.exports = router;

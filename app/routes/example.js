const express = require('express');
const router = express.Router();
const { ExampleController } = require('@/app/controllers');

router
    .route('/')
    .get(ExampleController.getAll)
    .post(ExampleController.createOne);

module.exports = router;

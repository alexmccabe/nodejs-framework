const express = require('express');
const router = express.Router();
const { ExampleApiController } = require('@/app/controllers').api;

router
    .route('/')
    .get(ExampleApiController.getAll)
    .post(ExampleApiController.createOne);

module.exports = router;

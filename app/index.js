const express = require('express');
const app = express();
const passportConfig = require('@/config/passport');

require('@/routes')(app);

module.exports = app;

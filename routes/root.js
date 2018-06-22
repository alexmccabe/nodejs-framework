const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Home');
});

router.get('/logout', (req, res) => {
    req.logout();

    return res.redirect('/');
});

module.exports = router;

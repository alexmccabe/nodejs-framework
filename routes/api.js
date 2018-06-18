const express = require('express');
const router = express.Router();

router.get('/current-user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.send(req.user);
    }

    return res.sendStatus(403);
});

router.get('/logout', (req, res) => {
    req.logout();

    return res.redirect('/');
});

module.exports = router;

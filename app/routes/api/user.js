const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.send(req.user);
    }

    return res.sendStatus(403);
});

module.exports = router;

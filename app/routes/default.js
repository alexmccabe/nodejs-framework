const express = require('express');
const router = express.Router();
const fs = require('fs');
const cheerio = require('cheerio');

router.get('/csrf-token-meta-demo', (req, res, next) => {
    fs.readFile('public/csrf-token-meta-demo.html', (err, html) => {
        if (err) {
            return next(err);
        }

        const $ = cheerio.load(html);

        $('head').append(
            `<meta name="csrf-token" content="${req.csrfToken()}">`
        );

        return res.send($.html());
    });
});

router.get('/', (req, res) => {
    res.send('Home');
});

router.get('/logout', (req, res) => {
    req.logout();

    return res.redirect('/');
});

module.exports = router;

const PrettyError = require('pretty-error');
const pe = new PrettyError();
const Youch = require('youch');

module.exports = {
    notFound(req, res) {
        res.status(404);

        if (req.accepts('html')) {
            return res.render('errors/404', { url: req.url });
        }

        // respond with json
        if (req.accepts('json')) {
            return res.send({ error: 'Not found' });
        }

        // default to plain-text. send()
        return res.type('txt').send('Not found');
    },

    apiErrorHandler(error, req, res, next) {
        if (error) {
            console.error(pe.render(error));

            res.statusCode === 200 ? res.status(500) : null;
            return res.json(error.message || error.toString());
        }

        return next();
    },

    errorHandler(error, req, res, next) {
        if (error) {
            console.error(pe.render(error));

            if (process.env.NODE_ENV !== 'production') {
                const youch = new Youch(error, req);

                return youch.toHTML().then(html => {
                    res.writeHead(200, { 'content-type': 'text/html' });
                    res.write(html);
                    res.end();
                });
            } else {
                res.statusCode === 200 ? res.status(500) : null;
                return res.send(error.message || error.toString());
            }
        }

        return next();
    }
};

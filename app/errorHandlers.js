module.exports = {
    apiErrorHandler(error, req, res, next) {
        if (error) {
            console.error(error.stack);

            res.status(500).send(error.message || error.toString());
        }
    }
};

const { ExampleService } = require('@/services');

function getAccepts(req) {
    return req.accepts(['html', 'json']);
}

exports.getAll = (req, res, next) => {
    const accepts = getAccepts(req);

    return ExampleService.getAll()
        .then(result => res.json(result))
        .catch(err => next(err));
};

exports.createOne = (req, res, next) => {
    const accepts = getAccepts(req);
};

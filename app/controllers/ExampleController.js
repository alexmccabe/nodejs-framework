const { ExampleService } = require('@/app/services');

function getAccepts(req) {
    return req.accepts(['html', 'json']);
}

exports.getAll = (req, res, next) => {
    const accepts = getAccepts(req);

    return ExampleService.getAll()
        .then(result => res.json({ data: result }))
        .catch(err => next(err));
};

exports.createOne = (req, res, next) => {
    const accepts = getAccepts(req);
    console.log('hi');
};

const { ExampleService } = require('@/app/services');

exports.getAll = (req, res, next) => {
    return ExampleService.getAll()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch(err => next(err));
};

// exports.createOne = (req, res, next) => {
//     console.log('hi');
// };

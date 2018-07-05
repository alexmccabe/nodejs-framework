const { ExampleModel } = require('@/app/models');

exports.findByParam = () => {};
exports.getAll = () => {
    return ExampleModel.find({}).exec();
};
exports.getOne = id => {};
exports.deleteOne = id => {};
exports.updateOne = id => {};
exports.createOne = () => {};

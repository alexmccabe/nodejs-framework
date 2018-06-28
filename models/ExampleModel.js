const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    age: Number,
    firstName: { type: String, required: true },
    lastName: String,
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicles' }
});

schema.virtual('id').get(function() {
    return this._id.toString();
});

module.exports = mongoose.model('examples', schema);

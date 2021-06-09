const mongoose = require('mongoose');

const sunglassSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Sunglass = mongoose.model('Sunglass', sunglassSchema);

module.exports = Sunglass;
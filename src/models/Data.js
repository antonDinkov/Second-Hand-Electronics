const { Schema, model, Types } = require('mongoose');

//TODO replace with data model from exam description

const dataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    damages: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^https?:\/\//.test(v),
            message: 'Image URL must start with http:// or https://'
        }
    },
    description: {
        type: String,
        required: true
    },
    production: {
        type: Number,
        required: true
    },
    exploitation: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    buyingList: {
        type: [Types.ObjectId],
        ref: 'User',
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Data = model('Data', dataSchema);

module.exports = { Data };

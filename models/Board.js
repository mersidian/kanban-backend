const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [
        {
            name: String,
            color: String
        }
    ],
    columns: [
        {
            title: String,
            position: Number
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Board', BoardSchema);
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    approved: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    attachments: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

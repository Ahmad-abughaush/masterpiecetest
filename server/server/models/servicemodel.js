const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    }
    ,
    attachments: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

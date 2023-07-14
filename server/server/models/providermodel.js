const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    
    // approved:{

    // },
    
    role: {
        type: String,
        required: true,
        maxlength: 10,},
    username: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 50,
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

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

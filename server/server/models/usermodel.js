
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    approved: {
        type: Boolean,
        default: false, 
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
    },

    role: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
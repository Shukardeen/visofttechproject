const mongoose = require('mongoose');

const otpSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '10m'
    }
});

module.exports = mongoose.model('Otp', otpSchema);
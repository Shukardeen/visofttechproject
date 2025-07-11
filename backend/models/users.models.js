const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePic:{
        type:String,
    },
    company:{
        type:String,
        default:""
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone:{
        type:Number,
        minlength: 10,
        maxlength: 10,
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const Contact=mongoose.model('Contact',contactSchema);

module.exports=Contact;

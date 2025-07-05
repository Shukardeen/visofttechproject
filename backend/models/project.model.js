const mongoose = require('mongoose');

const projectSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    images:[{
        imageUrl: {
            type: String,
        },
        imagePublicId: {
            type: String,
        }
    }],
    projectUrl:{
        type: String,
        required: true
    },
    technologies:{
        type: [String],
        required: true
    },
    category:{
        type: String,
        required: true
    },
},{timestamps: true});

const Project=mongoose.model('Project',projectSchema);

module.exports=Project;

const Project=require('../models/project.model');
const { cloudinary } = require('../config/cloudinary');
const sendEmail = require('../config/mail.config');
const User=require('../models/users.models');
const { updateProjectMessage } = require('../utils/messageTemplets');

//handle create project
const handleCreateProject = async (req, res) => {
    try {
        const users = await User.find({});
        const { title, description,  projectUrl, technologies,category } = req.body;
        const imageUrls=req.files.map(file=>file.path);
        const imagePublicIds=req.files.map(file=>file.filename);
        const newProject = new Project({
            title,
            description,
            projectUrl,
            technologies,
            category,
            images: imageUrls.map((url, index) => ({
                imageUrl: url,
                imagePublicId: imagePublicIds[index]
            })),
        });
        await newProject.save();

        const subject=`New Project Launched 🚀 | VISOFTTECH`;
        users.map(async (user) => {
        const message=updateProjectMessage(user.name,newProject.title,newProject.description,newProject.projectUrl,newProject.technologies);

        await sendEmail(
            user.email,
            subject,
            message
        );
        });
        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//handle get all projects
const handleGetProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ message: "All projects fetched successfully", projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//handle get project by id
const handleGetProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: "Project fetched successfully", project });
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const handleUpdateProject = async (req, res) => {
    try{
        const { id } = req.params;
        console.log("req.body", req.body);
        imageUrl = req.files.map(file => file.path);
        imagePublicId = req.files.map(file => file.filename);
        const { title, description,  projectUrl, technologies } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(id, {
            title,
            description,
            images:imageUrl.map((url,index)=>({
                    imageUrl: url,
                    imagePublicId: imagePublicId[index]
            })),
            projectUrl,
            technologies
        }, { new: true });
        
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const handleDeleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Delete images from cloud storage if applicable
        if( project.images && project.images.length > 0) {
            const imagePublicIds = project.images.map(image => image.imagePublicId);
            console.log('Deleting images with public IDs:', imagePublicIds);
            imagePublicIds.map(async (publicId, index) => {
                if (publicId) {
                    try {
                        await cloudinary.uploader.destroy(publicId);
                        // console.log(`Image with public ID ${publicId} deleted successfully`);
                    } catch (error) {
                        console.error(`Error deleting image with public ID ${publicId}:`, error);
                    }
                }
            });
        }

        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: "Project deleted successfully" });

    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    handleCreateProject,
    handleGetProjects,
    handleGetProjectById,
    handleUpdateProject,
    handleDeleteProject
};

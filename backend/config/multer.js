const multer = require("multer");
const { cloudinary } = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const projectStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AiSoftTech/projects", // The name of the folder in your Cloudinary account
    allowedFormats: ["jpg", "png", "jpeg"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional transformations
  },
});

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AiSoftTech/users", // The name of the folder in your Cloudinary account
    allowedFormats: ["jpg", "png", "jpeg"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional transformations
  },
});

const uploadProject = multer({storage: projectStorage });
const uploadUser = multer({storage: userStorage });

module.exports = {
    uploadProject,
    uploadUser
};

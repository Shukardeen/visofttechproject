const express = require("express");
const router = express.Router();
const {uploadProject} = require("../config/multer");
const {
  handleCreateProject,
  handleGetProjects,
  handleGetProjectById,
  handleUpdateProject,
  handleDeleteProject,
} = require("../controllers/project.controllers");
const {checkForAuthentication,checkForAdmin}=require('../middlewares/auth');

//Getting all Projects
router.get("/", handleGetProjects);

//Getting a Project by ID
router.get("/:id", handleGetProjectById);


//Admin Routes
//Creating a new Project
router.post("/", checkForAuthentication,checkForAdmin, uploadProject.array("projectImages", 5), handleCreateProject);

//Update a Project
router.patch("/:id", uploadProject.array("projectImages", 5),checkForAuthentication, checkForAdmin, handleUpdateProject);

//Delete a Project
router.delete("/:id", checkForAuthentication, checkForAdmin, handleDeleteProject);

module.exports = router;

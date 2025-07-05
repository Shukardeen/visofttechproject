const  User= require('../models/users.models');
const express = require('express');
const router = express.Router();
const { checkForAuthentication,checkForAdmin } = require('../middlewares/auth');
const { handleGetAllUsers, handleDeleteUser, handleUpdateUser } = require('../controllers/user.controller');

router.get('/', checkForAuthentication, checkForAdmin, handleGetAllUsers);
router.delete('/:userId', checkForAuthentication, checkForAdmin, handleDeleteUser);
router.patch('/:userId', checkForAuthentication, checkForAdmin, handleUpdateUser);

module.exports = router;
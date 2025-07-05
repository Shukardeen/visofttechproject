const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');
const { handleCreateContact, handleGetContacts ,handleAllMarkAsRead,handleMarkContactAsRead,handleGetSpecificContact ,handleDeleteContact} = require('../controllers/contact.controllers');
const {checkForAuthentication,checkForAdmin}=require('../middlewares/auth');
//Create a new contact message
router.post('/', handleCreateContact);

//Get all contact messages
router.get('/',checkForAuthentication,checkForAdmin,handleGetContacts);

//Getting a particular route
router.get('/:contactId',checkForAuthentication,checkForAdmin,handleGetSpecificContact);

//marks a contact message as read
router.patch('/:contactId',checkForAuthentication,checkForAdmin, handleMarkContactAsRead);

//marks all contact messages as read
router.patch('/',checkForAuthentication,checkForAdmin, handleAllMarkAsRead);

//Delete a contact message
router.delete('/:contactId',checkForAuthentication,checkForAdmin, handleDeleteContact);



module.exports = router;
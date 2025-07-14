const express = require('express');
const router = express.Router();
const {uploadUser}= require('../config/multer');
const {checkForAuthentication} = require('../middlewares/auth');

const {checkAuth, handleRegister, handleLogin, handleLogout, handleSendOtpforForgotPass ,handleResetPassword,handleUpdateProfile ,handleSendOtpToEmail,handleChangePassword} = require('../controllers/auth.controller');

//check auth route
router.get("/checkAuth", checkForAuthentication, checkAuth);

// Register a new user
router.post('/register', handleRegister);
// Login a user
router.post('/login', handleLogin);
// Logout a user
router.post('/logout', handleLogout);
// Forgot password
router.post('/forgotPassword', handleSendOtpforForgotPass);
// Reset password
router.post('/reset-password', handleResetPassword);
// Send OTP to email
router.post('/send-otp',handleSendOtpToEmail); 
//update user profile
router.patch('/update-profile', checkForAuthentication, uploadUser.single("profilePic"), handleUpdateProfile);
// Change password
router.patch('/change-password', checkForAuthentication, handleChangePassword);

module.exports = router;
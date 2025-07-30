const User = require("../models/users.models");
const Otp = require("../models/Otp.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/mail.config");
const {
  passwordResetOTPMessage,
  welcomeMessage,
  emailVerificationTemplate,
} = require("../utils/messageTemplets");

const handleRegister = async (req, res) => {
  try {
    const { name, phone, email, password, otp } = req.body;
    console.log(req.body);

    const user =
      (await User.findOne({ email })) || (await User.findOne({ phone }));
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    //check if the otp is valid
    const isValidOtp = await Otp.findOne({ email, otp });

    if (!isValidOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Delete the OTP after successful validation
    await Otp.deleteOne({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });
    await Otp.deleteOne({ email });
    await newUser.save();
    const subject = "Welcome to TechTalks";
    const message = welcomeMessage(newUser.name);
    console.log("message created");
    await sendEmail(newUser.email, subject, message);
    console.log("email sent");
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleLogin = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const user =
      (await User.findOne({ email })) || (await User.findOne({ phone }));
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const payload = {
      userId: user._id,
      isAdmin: user.isAdmin,
    };

    //generating token
    const token = jwt.sign(payload, process.env.MY_JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //cookie expires after 7 days
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// const handleGetOtpForForgetPass = async (req, res) => {
 
// };

const handleSendOtpforForgotPass=async(req,res)=>{
  console.log(req.body);
  const { email } = req.body;
  await Otp.findOneAndDelete({ email });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({
      email,
      otp,
    });
    console.log("otp sent")

    const message = passwordResetOTPMessage(user.name, otp);
    console.log(message);
    // Send OTP via email
    await sendEmail(email, "Your OTP Code", message);
    console.log("otp otp")
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const handleResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    // First find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is valid
    const isValidOtp = await Otp.findOne({ email, otp });
    if (!isValidOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Delete the OTP after successful password reset
    await Otp.deleteOne({ email });

    res.status(200).json({ message: "Password reset successful", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateProfile = async (req, res) => {
  const { name, phone, email, company } = req.body;
  const profilePic = req.file ? req.file.path : null;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.userId) {
        return res
          .status(400)
          .json({ message: "Email is already in use by another account" });
      }
    }
    if (phone && phone !== user.phone) {
      const existingUser = await User.findOne({ phone });
      if (existingUser && existingUser._id.toString() !== req.user.userId) {
        return res
          .status(400)
          .json({
            message: "Phone number is already in use by another account",
          });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $set: {
          name: name || user.name,
          phone: phone || user.phone,
          email: email || user.email,
          profilePic: profilePic || user.profilePic,
          company: company || user.company,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const handleSendOtpToEmail = async (req, res) => {
  try {
    const { email } = req.body;
    await Otp.findOneAndDelete({ email });
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      return res
        .status(404)
        .json({ message: "User Already Exists with this Email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const subject = "Your OTP Code";
    const message = emailVerificationTemplate(otp);

    // Save the OTP to the database
    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();
    await sendEmail(email, subject, message);

    res.status(200).json({ message: "OTP sent to your email", otp });
  } catch (error) {
    console.error("Error sending OTP to email:", error);
    throw new Error("Failed to send OTP");
  }
};

const handleChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password changed successfully", user });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//check auth controller
const checkAuth = (req, res) => {
  try {
    const user = req.user;
    if(!user) {
      return res.json({ isAuthenticated: false });
    }
    res.json({ isAuthenticated: true, user });
  } catch (err) {
    console.log("ERROR CHECKING AUTHENTICATION", err);
    res.json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleSendOtpforForgotPass,
  handleResetPassword,
  handleUpdateProfile,
  handleSendOtpToEmail,
  handleChangePassword,
  checkAuth
};

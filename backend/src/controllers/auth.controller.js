const validator = require("validator");
const hashThePass = require("../utils/bcryptHashPassword.js");
const { findByEmail, findById } = require("../validators/ifExist.js");
const insertNewUser = require("../services/insertUserInfo.js");
const generateToken = require("../utils/tokenGenerator.js");
const bcrypt = require("bcryptjs");
const cloudinary = require("../lib/cloudinary.js");
const updateProfilePic = require("../services/updateProfilePic.js");

let theHashedPass;

const signup = async (req, res) => {
    // Get fullName, email and password from user in frontend
    const { fullName, email, password } = req.body;
    try {

        // Check if the full name is provided
        if (!fullName) {
            return res.status(400).json({ message: "Please provide your full name" });
        }

        // Check if the password is provided
        if (!password) {
            return res.status(400).json({ message: "Please provide your password" });
        }

        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ message: "Please provide your email" });
        }

        // Check if the email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Check if the email exists in the database
        const userEmailExists = await findByEmail(email);
        if (userEmailExists) {
            console.log("Email already exists");
            return res.status(400).json({ message: "Email already exists" });

        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }


        // hash password
        const theHashedPass = await hashThePass(password);

        // insert new user
        const newUser = await insertNewUser(fullName, email, theHashedPass);
        console.log(`New Users ID: ${newUser}`);

        if (newUser) {
            generateToken(newUser, res);
            res.status(201).json({
                message: "success",
                id: newUser,
                fullName: fullName,
                email: email
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {

        // Get email and password from user in frontend
        const { email, password } = req.body;



        // Check if the user email exists
        const userEmailExists = await findByEmail(email);
        if (!userEmailExists) {
            console.log("Invalid Credentials");
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userEmailExists.password);

        if (!isPasswordCorrect) {
            console.log("Invalid Credentials");
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(userEmailExists.user_id, res);
        res.status(200).json({
            message: "Success",
            user_id: userEmailExists.user_id,
            fullName: userEmailExists.fullName,
            profilePic: userEmailExists.profilePic
        });

    } catch (err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (err) {
        console.log("Error in logout controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user.user_id;

        if(!profilePic){
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await updateProfilePic(
            userId,
            uploadResponse.secure_url
        );
        console.log(updatedUser);
        res.status(200).json({message: "Successfully updated the profile picture", updatedUser});

    } catch (err) {
        console.log("Error in updateProfile", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const checkAuth = (req, res) =>{
    try{
        res.status(200).json(req.user);
    }catch(err){
        console.log("Error in checkAuth controller",err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = { signup, login, logout, updateProfile, checkAuth };
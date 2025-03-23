const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validation Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        // check is email already exist
        const existedUser = await UserModel.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = await UserModel.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        res.status(500).json({
            message: "Error registering user",
            error: err.message
        });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (err) {
        res.status(500).json({
            message: "Error Login",
            error: err.message
        });
    }
}

const getUserInfo = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({
            message: "Error registering user",
            error: err.message
        });
    }
}

module.exports = { registerUser, loginUser, getUserInfo }
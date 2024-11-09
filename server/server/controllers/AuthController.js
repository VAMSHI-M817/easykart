const UserSchema = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY


//Register

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if the email is already registered
        const checkUser = await UserSchema.findOne({ email: email }).select('_id email')
        if (checkUser) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists!"
            });
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a n   ew user with hashed password
        const newUser = new UserSchema({
            userName,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const savedData = await newUser.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            data: savedData
        });

    } catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during registration",
            error: error.message
        });
    }
};

//Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await UserSchema.findOne({ email });
        if (!checkUser)
            return res.json({
                success: false,
                message: "User not found. Please register to continue !",
            });

        const checkPasswordMatch = await bcrypt.compare(
            password,
            checkUser.password
        );
        if (!checkPasswordMatch)
            return res.json({
                success: false,
                message: "Incorrect password! Please try again",
            });

        const accessToken = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                userName: checkUser.userName,
            },
            secretKey,
            { expiresIn: "60m" }
        );

        res.cookie("accessToken", accessToken, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName,
            },
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

//Logout
const logoutUser = (req, res) => {
    res.clearCookie("accessToken").json({
        success: true,
        message: "Logged out successfully"
    });
};
    
//AuthMiddleware
const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user"
        })
    }

    try {
        const decoded = jwt.verify(accessToken, secretKey)
        req.user = decoded
        next()

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user"
        })
    }
}





module.exports = { registerUser, loginUser, logoutUser, authMiddleware }
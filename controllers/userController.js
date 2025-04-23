const User = require("../modalls/userModel")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.json({
                success : true,
                message : "Please enter all fields"
            })
        }

        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid email or password"
            })
        }

        const isPasswordSame = await bycrpt.compare(password, user.password);

        if(!isPasswordSame){
            return res.status(400).json({
                success : false,
                message : "Invalid email or password"
            })
        }

        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const expiryTimeInSeconds = currentTimeInSeconds + 3600;

        const jwtToken = {
            userId : user._id,
            email : user.email,
            exp : expiryTimeInSeconds
        }

        const token = jwt.sign(jwtToken, process.env.JWT_SECRET)

        const userData = {
            _id : user._id,
            name : user.name,
            email : user.email,
            password : user.password,
            token
        }

        res.status(200).json({
            success : true,
            message : "User LoggedIn successfully",
            user : userData,
            token
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Sever Error",
            err : error 
         })
    }
}

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if(!email || !password || !name){
            return res.status(400).json({
                success : false,
                message : "Please enter all fields"
            })
        }

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User already exists"
            })
        }

        const hashPassword = await bycrpt.hash(password, 16);

        const createUser = await User.create({
            name,
            email,
            password : hashPassword
        })

        res.status(200).json({
            success : true,
            message : "User created successfully",
            user : createUser
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "User creation failed"
        })
    }
}

const userController = {
    login,
    register
}

module.exports = userController
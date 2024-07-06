import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";
import { generateAccessToken, generateRefreshToken } from "../utils/JwtToken.js";

/**
 * User Controller class
 */
class UserController {
    /**
     * User Registration
     * 
     * Registers a new user with the provided email, password, name, and term condition.
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next function
     * 
     * @example
     * {
     *   "email": "example@example.com",
     *   "password": "password123",
     *   
     * }
     */
    static UserRegistration = async (req, res, next) => {
        const { email, password } = req.body
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(420).json({
                message: error.errors[0].msg
            })
            return
        }
        const user = await UserModel.findOne({ email: email })
        if (user) {
            res.status(409).json({
                message: 'This email is already registered',
                email: email
            })
            next()
        } else {
            if (email && password) {

                try {
                    // generat a hashpasword for user to enchance security

                    const hashpassword = await bcrypt.hash(password, 12)
                    const User = new UserModel({
                        email: email,
                        password: hashpassword,
                    })
                    await User.save()
                    res.status(201).json({
                        message: `User Signup Succesfully`,
                        email: email,
                    })
                } catch (error) {
                    res.status(500).json({
                        message: 'An Error Occured in Registration '
                    })
                }
            } else {
                res.status(403).json({
                    message: 'All field are required'
                })
            }
        }
    }

    /**
     * User Login
     * 
     * Logs in an existing user with the provided email and password.
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next function
     * 
     * @example
     * {
     *   "email": "example@example.com",
     *   "password": "password123"
     * }
     */
    static UserLogin = async (req, res, next) => {
        const { email, password } = req.body

        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(420).json({
                message: error.errors[0].msg
            })
            return
        }
        if (email && password) {
            const user = await UserModel.findOne({ email: email })
            if (user) {
                const decrypass = await bcrypt.compare(password, user.password)
                if (!decrypass) {
                    res.status(400).json({
                        message: 'Password is wrong'
                    })
                    return
                }
                if ((user.email === email) && decrypass) {
                    // Generate tokens
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);

                    // if we want to save the token in cokkies 

                    // res.cookie('accessToken', accessToken, {
                    //     httpOnly: true,
                    //     secure: true,
                    // });

                    // res.cookie('refreshToken', refreshToken, {
                    //     httpOnly: true,
                    //     secure: true,
                    // });

                    res.status(200).json({
                        message: 'Login Succesfully',
                        email: email,
                        accessToken,
                        refreshToken
                    })
                } else {
                    res.status(409).json({
                        message: `email and Password is not valid`
                    })
                    next()
                }
            } else {
                res.status(409).json({
                    message: `This email is not registered`
                })
                next()
            }
        } else {
            req.status(409).json({
                message: 'Email and Password are required'
            })
        }
    }
}

export default UserController
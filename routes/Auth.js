import express from 'express'
const Authrouter = express.Router()
import UserController from '../controllers/UserController.js'
import { isAuth } from '../middlewares/isAuth.js'

import { body , check } from 'express-validator'
Authrouter.post('/signup', [
    body('email').isEmail().withMessage('Please enter the valid Email'),
    body('password').trim().notEmpty().isAlphanumeric().isLength({ min: 6 }).withMessage('A password must be 6 char long and Alphanumeric')
], UserController.UserRegistration)

Authrouter.post('/login', [body('email').isEmail().withMessage('Please enter the valid Email'),
    body('password').trim().notEmpty().isAlphanumeric().isLength({ min: 6 }).withMessage('Enter a valid password')], UserController.UserLogin)
export default Authrouter


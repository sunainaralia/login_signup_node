import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'


export const isAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEy)
            req.user = await UserModel.findById(userId).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: 'Unauthorized User'
            })
        }
    }
    if (!token) {
        res.status(401).json({
            message: 'token is not provided'
        })
    }
}


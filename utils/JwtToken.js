import jwt from 'jsonwebtoken'

function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEy, { expiresIn: '1d' });
}

function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEy, { expiresIn: '7d' });
}



export { generateAccessToken, generateRefreshToken };

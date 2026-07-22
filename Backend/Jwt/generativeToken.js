import jwt from 'jsonwebtoken'

const createToken = (userId, res ) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '5d'
    });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: isProd, // send cookie only over HTTPS in production
        sameSite: isProd ? 'none' : 'lax', // allow cross-site cookies in production
    })
}

export default createToken
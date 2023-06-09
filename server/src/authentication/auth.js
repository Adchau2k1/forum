import jwt from 'jsonwebtoken'

export default function checkToken(req, res, next) {
    // Bỏ qua đăng ký và đăng nhập
    if (req.url === '/users/login' || req.url === '/users/register') {
        next()
        return
    }

    const token = req.headers?.authorization?.split(' ')?.[1]
    if (!token) {
        res.status(401).json({
            status: false,
            message: 'Not authenticated!',
        })
    }

    try {
        const jwtObj = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const isExpired = Date.now() >= jwtObj.exp * 1000

        if (isExpired) {
            res.status(401).json({
                status: false,
                message: 'Not authenticated!',
            })
        }

        next()
    } catch (err) {
        res.status(401).json({
            error: err.message,
        })
    }
}

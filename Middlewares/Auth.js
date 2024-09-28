import jwt from 'jsonwebtoken'
import { User } from '../Models/User.js'

export const Authenticate = async (req, res, next) => {
    const token = req.header("Auth")
    
    if(!token) return res.status(400).json({message: "Login First"})
        const decoded = jwt.verify(token, process.env.JWT_Secret)
        const id = decoded.userId

        let user = await User.findById(id)
        if(!user) return res.status(404).json({message: "User not found"})
            req.user = user
    next()
}
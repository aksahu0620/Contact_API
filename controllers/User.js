import { User } from "../Models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register user
export const register = async (req, res) => {
    const { name, email, password } = req.body
    if (name == '' || email == '' || password == '') return res.status(400).json("all feilds are required")
    let user = await User.findOne({ email })
    if (user) return res.json({ message: "user already exist" })
    const hashpass = await bcrypt.hash(password, 10)
    user = await User.create({
        name,
        email,
        password: hashpass
    })
    res.json({ message: "User register successfully..!", user })
}


// login user
export const login_user = async (req, res) => {
    const { email, password } = req.body
    if (email == '' || password == '') return res.status(400).json("all feilds are required")

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "user not exist" })

    const validpass = await bcrypt.compare(password, user.password)
    if (!validpass) return res.json({ message: "wrong password" })

    const token = jwt.sign({userId: user._id}, process.env.JWT_Secret, {expiresIn: '1d'})
    res.json({ message: `welcome back ${user.name}`, token })
}
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Users } from '../models/index.js'
import dotenv from 'dotenv'

dotenv.config();


export const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' })
    }

    try {
        const exisitingUser = await Users.findOne({ where: { email } })
        if (exisitingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const usernameExists = await Users.findOne({ where: { username } });
        if (usernameExists) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: 'User created successfully',
            id: user.id
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to create user' })
    }
}

export const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Missing email or password' })
        }

        const user = await Users.findOne({ where: { email } })
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            const token = generateToken(user)
            res.json({
                message: 'User authenticated successfully',
                token
            })
        }
        else {
            res.status(401).json({ message: "Invalid password" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to create user' })
    }
}

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    }

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
}
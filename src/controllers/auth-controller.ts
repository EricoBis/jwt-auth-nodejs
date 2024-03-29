import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !user?.password)
            return res.status(401).json({ error: 'Authentication failed' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            return res.status(401).json({ error: 'Authentication failed' });

        const accessToken = createAccessToken(user.id);
        res.status(200).json({ userId: user.id, accessToken });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}

export const registerController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(409).json({ error: 'User with this email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        user.save();
        const accessToken = createAccessToken(user.id);

        res.status(201).json({ userId: user.id, accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Registration Failed' });
    }
}

function createAccessToken(userId: string) {
    const tokenSecret = process.env.TOKEN_SECRET || 'exampletoken';
    return jwt.sign({ userId: userId },
        tokenSecret,
        { expiresIn: '1h' }
    );
}
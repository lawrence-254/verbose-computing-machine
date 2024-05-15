import User from '../models/user.models.js';
import bycrypt from 'bcryptjs';

export const register = async (req, res, next) => {
    const { firstname, middlename, lastname, username, email, password } = req.body;
    try {
        const hashedPassword = bycrypt.hashSync(password, 12);
        const newUser = User({ firstname, middlename, lastname, username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json(`User ${newUser.username}, registered successfully`);
    } catch (err) {
        next(err);
    }
}
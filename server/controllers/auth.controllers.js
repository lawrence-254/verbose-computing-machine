import User from '../models/user.models.js';
import bycrypt from 'bcryptjs';
import errorHandler from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 * @param   {Object} req - Request object
 * @param   {Object} res - Response object
 * @param   {Function} next - Middleware next function
 * @returns {Object} - Registered user
 * @returns {Object} - Error message
 * @returns {Object} - Error status code
 */
export const register = async (req, res, next) => {
    // Get the firstname, middlename, lastname, username, email and password from the request body
    const { firstname, middlename, lastname, username, email, password } = req.body;
    // Check if the user already exists in the database
    const user = await User.findOne({ $or: [{ username }, { email }] });
    // If the user exists, return an error message
    if (user) {
        // Return a 409 error message
        return next(errorHandler(409, 'User already exists'));
    }

    try {
        // Hash the password
        const hashedPassword = bycrypt.hashSync(password, 12);
        // Create a new user
        const newUser = User({ firstname, middlename, lastname, username, email, password: hashedPassword });
        // Save the new user to the database
        await newUser.save();
        // Return a success message
        res.status(201).json(`User ${newUser.username}, registered successfully`);
    } catch (err) {
        next(err);
    }
}


/**
    * @desc    Login a user
    * @route   POST /api/auth/login
    * @access  Public
    * @param   {Object} req - Request object
    * @param   {Object} res - Response object
    * @param   {Function} next - Middleware next function
    * @returns {Object} - Logged in user
    * @returns {Object} - Error message
    * @returns {Object} - Error status code
    *
 */
export const login = async (req, res, next) => {
    // Get the username, email and password from the request body
    const { username, email, password } = req.body;
    try {
        // Check if the user exists in the database
        const userExist = await User.findOne({ $or: [{ username }, { email }] });
        // If the user does not exist, return an error message
        if (!userExist) {
            // Return a 404 error message
            return next(errorHandler(404, 'User not found, Check your email or username'))
        }
        // Compare the password provided with the password in the database
        const correctPassword = bycrypt.compareSync(password, userExist.password);
        // If the password is incorrect, return an error message
        if (!correctPassword) {
            // Return a 404 error message
            return next(errorHandler(404, 'Wrong Password'))
        }
        // Create a token for the user
        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3 * 60 * 60 * 1000) }).status(200).json({ userExist });
    } catch (err) {
        next(err);
    }
}

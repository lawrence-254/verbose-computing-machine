import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: false,

    },
    middlename: {
        type: String,
        required: false,
        unique: false,

    },
    lastname: {
        type: String,
        required: true,
        unique: false,

    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
}, { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
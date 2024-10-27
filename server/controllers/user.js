import {User} from '../models/user.js';
import {cookieOptions, sendToken} from "../utils/features.js";
import {compare} from "bcrypt";
import {TryCatch} from "../middlewares/error.js";
import {ErrorHandler} from "../utils/utility.js";

const register = async (req, res) => {
    const { name, username, password, bio } = req.body;

    const avatar = {
        public_id: 'Sdfsd',
        url: 'asdfd',
    }

    const user = await User.create({
        name,
        bio,
        username,
        password,
        avatar,
    });

    sendToken(res, user, 201, 'User created successfully.');
};

const login = TryCatch(async (req, res, next) => {
    const {username, password} = req.body;
    const user = await User.findOne({username}).select('+password');
    if(!user) {
        return next(new ErrorHandler('Invalid Username.', 401));
    }

    const isPasswordMatch = await compare(password, user.password);
    if(!isPasswordMatch) {
        return next(new ErrorHandler('Invalid Password.', 401));
    }

    sendToken(res, user, 200, `Welcome Back, ${user.name}.`);

});

const getMyProfile = TryCatch(async (req, res) => {

    const userId = await User.findById(req.userId).select('+password');

    res.status(200).json({
        success: true,
        message: 'getMyProfileSuccess',
        data: userId,
    });
});

const logout = TryCatch(async (req, res) => {

    return res
        .status(200)
        .cookie(process.env.COOKIE, '', { ...cookieOptions, maxAge: 0 })
        .json({
            success: true,
            message: 'Logout success',
        });
});

const searchUser = TryCatch(async (req, res) => {

    const {name} = req.query;



    return res
        .status(200)
        .json({
            success: true,
            message: name,
        });
});

export { login, register, getMyProfile, logout, searchUser };
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Role from "../models/Role.js";
import User from "../models/user.js";
import { CreateError } from '../utils/error.js';
import { CreateSuccess } from '../utils/success.js';

export const register = async (req, res, next) => {
    try {
        const role = await Role.find({ role: 'User' });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
            roles: role,
        });

        await newUser.save();
        return next(CreateSuccess(200, "User created successfully"));
    } catch (error) {
        console.error(error);
        return next(CreateError(500,'An error occurred during registration'));
    }
};

export const registerAdmin = async (req, res, next) => {
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
            isAdmin: true,
            roles: role,
        });

        await newUser.save();
        return next(CreateSuccess(200, "Admin created successfully"));
    } catch (error) {
        console.error(error);
        return next(CreateError(500,'An error occurred during registration'));
    }
};



export  const login = async (req,res,next)=> {
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles", "role");

        const { roles } = user;
        if (!user){
            return next(CreateError(404,'user not found'));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return next(CreateError(403,'Wrong password'));
        }
        const token = jwt.sign(
            {userId : user._id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        )
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login Success",
            data: user
        })
    } catch (error) {
        return next(CreateError(500,'An error occurred during registration'));
    }
}
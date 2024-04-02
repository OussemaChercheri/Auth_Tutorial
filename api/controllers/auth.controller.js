import bcrypt from 'bcryptjs';
import Role from "../models/Role.js";
import User from "../models/user.js";

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
        return res.status(200).send('User registered');
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred during registration');
    }
};


export  const login = async (req,res,next)=> {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user){
            return res.status(404).send("User not found")
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Wrong Password");
        }
        return res.status(200).send('user logged in')
    } catch (error) {
        return res.status(500).send("Something went wrong!");
    }
}
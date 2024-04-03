import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import roleRoute from './routes/role.js';
import userRoute from './routes/user.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//Response Handler Middleware

app.use((obj, req, res, next)=>{
    const statusCode = obj.status || 500;
    const message = obj.message  || "Internal Server Error";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a=> a === obj.status) ? true: false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});

//DB Connection
const connectMongodb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database");
    } catch (error) {
        throw error;
    }
}
app.listen(process.env.PORT, ()=>{
    connectMongodb();
    console.log("connected to backend at  port ", process.env.PORT);
});
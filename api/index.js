import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import roleRoute from './routes/role.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);

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
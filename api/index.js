import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import roleRoute from './routes/role.js';

const app = express();
dotenv.config();
app.use(express.json());

//DB Connection
const connectMongodb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database");
    } catch (error) {
        throw error;
    }
}

app.use("/api/role", roleRoute);

app.listen(process.env.PORT, ()=>{
    connectMongodb();
    console.log("connected to backend at  port ", process.env.PORT);
});
import express from 'express';
import dotenv from 'dotenv';
import {connectDb} from './config/db.js';
import authRouter from './routes/auth_routes.js';
import userRouter from './routes/user_routes.js';

dotenv.config();

const app = express();
app.use(express.json());
connectDb();

app.use("/api/auth" , authRouter);
app.use("/api/user", userRouter);

app.get("/",(req,res)=>{
res.send("Server running fine.")
});

//SERVER START
const PORT = process.env.PORT ||  8000;
app.listen(PORT, () => {
    console.log('\nServer running at http://localhost:8000\n');
});

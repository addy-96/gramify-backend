import express from 'express';
import dotenv from 'dotenv';
import {connectDb} from './config/db.js';
import authRouter from './routes/auth_routes.js';
import userRouter from './routes/user_routes.js';
import {verifyJWT} from './middlewares/verifyJWT.js'
import {requestLogger} from './middlewares/request_logger.js'

dotenv.config();
connectDb();

const app = express();
app.use(express.json());

app.use(requestLogger);

app.use("/auth", authRouter);
app.use("/user", verifyJWT, userRouter);

app.get("/test",(_,res)=>{
res.send("Server running fine!");
});

//SERVER START
const PORT = process.env.PORT ||  3001;
app.listen(PORT, () => {
    console.log('\nServer running at http://localhost:3001\n');
});

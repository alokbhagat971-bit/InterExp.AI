import express from 'express';
import dotenv from 'dotenv';
import dns from 'dns';
import connectDB from './config/connectDB.js';
import cookiesParser from 'cookie-parser';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import cors from 'cors';
import interviewRouter from './routes/interviewRoute.js'
import paymentRouter from './routes/paymentRoute.js'

dotenv.config();

// Force Node to use Google/Cloudflare DNS - fixes SRV record
// resolution failures (ECONNREFUSED on _mongodb._tcp...) seen on
// some networks where the default resolver mishandles SRV queries
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookiesParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview",interviewRouter)
app.use("/api/payment",paymentRouter)

const PORT = process.env.PORT || 6000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
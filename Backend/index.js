import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/user.routes.js';
import messageRoutes from './Routes/message.routes.js';
import { server, app, io } from './SocketIO/server.js';

// require("dotenv").config();
dotenv.config();


// const app = express();

app.use(cookieParser());
app.use(express.json());
// app.use(cors({
//   origin: [
//         "http://localhost:5173", // Local development
//         process.env.CLIENT_URL   // Vercel frontend
//   ].filter(Boolean),
//   credentials: true,
// })
// );

app.use(cors({
  origin: function (origin, callback) {
    console.log("Origin:", origin);

    const allowedOrigins = [
      "http://localhost:5173",
      process.env.CLIENT_URL
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

const PORT = process.env.PORT || 3000;
// console.log("MongoDB URI",process.env.MONGODB_URI);
// const connectDB = mongoose.connect(process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB Error:", error);
  }
};

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
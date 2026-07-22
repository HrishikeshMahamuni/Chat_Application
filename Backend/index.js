import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/user.routes.js';
import messageRoutes from './Routes/message.routes.js';
import path from 'path';
import { server, app, io } from './SocketIO/server.js';


// const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: [
        "http://localhost:5173", // Local development
        "http://localhost:5174",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        process.env.CLIENT_URL   // Vercel frontend
  ].filter(Boolean),
  credentials: true,
}));

// Ensure CORS headers are always present (covers preflight and non-standard setups)
app.use((req, res, next) => {
  const origin = req.headers.origin || '';
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const PORT = parseInt(process.env.PORT, 10) || 3001;
// console.log("MongoDB URI",process.env.MONGODB_URI);
// const connectDB = mongoose.connect(process.env.MONGODB_URI);

console.log("CLIENT URL", process.env.CLIENT_URL);

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
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Change PORT in Backend/.env or stop the conflicting process.`);
  } else {
    console.error('Server startup error:', err);
  }
  process.exit(1);
});
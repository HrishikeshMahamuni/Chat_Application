import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/user.routes.js';
import messageRoutes from './Routes/message.routes.js';
import { server, app, io } from './SocketIO/server.js';


// const app = express();

app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      console.log('CORS: no origin, allowing');
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      console.log('CORS: allowing origin', origin);
      return callback(null, true);
    }
    console.warn('CORS: denying origin', origin);
    return callback(new Error('CORS policy does not allow this origin'), false);
  },
  credentials: true,
}));

const PORT = process.env.PORT || 3001;
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

server.on('error', (err) => {
  console.error('Server error during startup:', err);
  if (err && err.code === 'EADDRINUSE') {
    const fallback = parseInt(PORT) + 1;
    console.log(`Port ${PORT} in use, trying ${fallback}`);
    server.listen(fallback, () => console.log(`Server started on fallback port ${fallback}`));
  } else {
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
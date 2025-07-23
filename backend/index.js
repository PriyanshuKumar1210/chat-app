import express from 'express';
import authRoutes from "./src/routes/auth.route.js";
import { connectDB } from './src/lib/db.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import messageRoute from './src/routes/message.route.js';
import cors from "cors";
import { app,server } from './src/lib/socket.js';


const port = 5001;

dotenv.config(); // Load environment variables

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Middleware to handle larger payloads (important!)
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// Middleware for cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/message", messageRoute);

// Connect to DB and start server
connectDB();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

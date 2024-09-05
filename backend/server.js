import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDb.js';
import { app, server } from './socket/socket.js';


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

//middle ware used here 
app.use(express.json());     // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

//FOR AUTHENTICATION
app.use('/api/auth', authRoutes)

//FOR MESSAGES
app.use('/api/messages', messageRoutes)

//FOR USERS
app.use('/api/users', userRoutes)

//deployment things
app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

// app.get('/', (req, res) => {

//     res.send("Hello world!!!!");
// })

server.listen(PORT, () => {

    connectToMongoDB();
    console.log(`Sever is running on port ${PORT}`)
})
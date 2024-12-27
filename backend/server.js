import 'dotenv/config'

import express from 'express';
import http from 'http';
import cors from 'cors';
import multer from 'multer';
import connectDB from './config/db.js';

//import routes
import authRoutes from'./routes/auth.js';
import documentRoutes from'./routes/documents.js';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;
connectDB();

//multer
const upload = multer();
app.use(upload.none()); // To parse form-data without files


// cors cross origin resourc sharing
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

//middleware & routes
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Basic route
app.get("/", (req, res) => {
    res.send("API is running");
  });

server.listen(PORT, ()=>{
    console.log(`server is listning to http://localhost:${PORT}`)
})
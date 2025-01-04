import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import multer from 'multer';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import documentRoutes from './routes/documents.js';
import Document from './models/Document.js';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
connectDB();

// Multer setup for handling form-data (if needed)
const upload = multer();
app.use(upload.none()); // Parse form data without files

// CORS setup for allowing frontend requests
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing JSON
app.use(express.json());

// Socket.IO setup for real-time collaboration
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('New WebSocket connection:', socket.id);

    socket.on('joinDocument', (documentId) => {
        // console.log(`Socket ${socket.id} joined document ${documentId}`);
        socket.join(documentId);
        Document.findById(documentId)
            .then(doc => {
                // console.log('Sending document data to client:', doc);
                socket.emit('receiveUpdate', doc);
            })
            .catch(err => console.error('Error fetching document:', err));
    });

    socket.on('documentUpdate', async ({ documentId, title, content, comment }) => {
        console.log(`Document update for ${documentId}:`, { title, content, comment });

        try {
            const updatedDocument = await Document.findByIdAndUpdate(documentId, { title, content, comment }, { new: true });
            // console.log('Updated document:', updatedDocument);
            socket.to(documentId).emit('receiveUpdate', updatedDocument);
        } catch (err) {
            console.error('Failed to update document:', err);
        }
    });

    socket.on('disconnect', () => {
        // console.log(`Socket ${socket.id} disconnected`);
    });
});


// Basic route
app.get("/", (req, res) => {
    res.send("API is running");
});

// Routes for authentication and documents
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
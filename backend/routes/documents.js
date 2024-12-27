// api/document display all document
// api/document/:id -display single doc
// api/document/ - create document
// api/document/edit/:id - put
// api/document/delete/:id delete 

// Week 2 Milestone
// ----------------
 
// Improvisations on the backend
// -Change the model
// -Change the existing routes
// -Add new routes
// -New middlewares
// -Validation

import express from 'express';
import Document from '../models/Document.js';
import verifyToken from '../middleware/auth.js';
const documentRoutes = express.Router();

// Get all documents for the logged-in user
documentRoutes.get('/', verifyToken, async (req, res) => {
    try {
        // const documents = await Document.find({ owner: req.user.id });
        const documents = await Document.find({});
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single document by ID
documentRoutes.get('/:id', verifyToken, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        // if (document.owner.toString() !== req.user.id) {
        //     return res.status(403).json({ message: 'Not authorized' });
        // }
        res.json(document);
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new document
documentRoutes.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newDocument = await Document.create({
            title,
            content,
            owner: req.user.id,
        });
        res.json(newDocument);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a document
documentRoutes.put('/:id', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedDocument = await Document.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        res.json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a document
documentRoutes.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default documentRoutes
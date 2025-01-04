import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDocumentById, updateDocument, deleteDocument } from '../services/documentService';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import Title from '../components/Title.js';
import ShareModal from '../components/ShareModel.js';
import DownloadPDF from '../components/DownloadPdf.js';

const Document = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const [showModal, setShowModal] = useState(false);
  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [isOwner, setIsOwner] = useState(false); // Track if the user is the document owner
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Initialize socket only once
  const socket = useMemo(() => io('http://localhost:8080'), []);

  useEffect(() => {
    const fetchDocumentAndSetupSocket = async () => {
      try {
        const doc = await getDocumentById(id);
        setDocument(doc);
        setTitle(doc.title);
        setContent(doc.content);
        setComment(doc.comment); // Initialize comment
        setIsOwner(doc.ownerId === JSON.parse(localStorage.getItem('user'))?.id);

        // Join the socket room for real-time collaboration
        socket.emit('joinDocument', id);
        console.log(`Socket ${socket.id} joined document ${id}`);

        // Listen for real-time updates from other users
        socket.on('receiveUpdate', (updatedData) => {
          // console.log('Received document update:', updatedData);
          setTitle(updatedData.title);
          setContent(updatedData.content);
          setComment(updatedData.comment);
        });

      } catch (error) {
        toast.error('Failed to fetch document.');
        navigate('/dashboard');
      }
    };

    fetchDocumentAndSetupSocket();

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [id, navigate, socket]);

  const handleUpdate = async () => {
    try {
      // Update the document in the database
      await updateDocument(id, { title, content, comment });
      socket.emit('documentUpdate', { documentId: id, title, content, comment }); // Emit update to all clients
      setSuccessMessage('Document updated successfully!');
      toast.success('Document updated successfully!');
    } catch (error) {
      setError('Failed to update document');
      toast.error('Failed to update document.');
    }
  };

  const handleDelete = async () => {
    try {
      if (!isOwner) {
        toast.error('You are not authorized to delete this document.');
        return;
      }
      await deleteDocument(id);
      toast.success('Document deleted successfully!');
      navigate('/dashboard'); // Navigate back to dashboard after delete
    } catch (error) {
      setError('Failed to delete document');
      toast.error('Failed to delete document.');
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch((err) => console.error('Error copying link:', err));
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    socket.emit('documentUpdate', { documentId: id, title: newTitle, content, comment });
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit('documentUpdate', { documentId: id, title, content: newContent, comment });
  };

  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    setComment(newComment);
    socket.emit('documentUpdate', { documentId: id, title, content, comment: newComment });
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!document) return <div>Loading...</div>;

  return (
    <div className="container mt-5 justify-content-center align-items-center">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div style={{ flex: 1 }}>
          <Title text1="Your" text2="Document" />
        </div>
        <div>
          <button className="btn btn-success m-2 rounded-pill" onClick={toggleModal}>Share</button>
          <ShareModal showModal={showModal} toggleModal={toggleModal} copyLink={copyLink} />
        </div>
        <DownloadPDF contentId="content" filename={`${title}.pdf`} />
      </div>

      {/* Document Fields */}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          className="form-control"
          rows="5"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          className="form-control"
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleUpdate}>Update Document</button>
        {isOwner && (
          <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete Document</button>
        )}
      </div>
    </div>
  );
};

export default Document;
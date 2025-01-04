import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import Title from '../components/Title.js';

const AddDoc = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (!token) {
        toast.warn('You need to log in to create a document.');
        return;
      }

      const { data } = await axios.post(
        'http://localhost:8080/api/documents',
        { title, content, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Document created successfully!');
      navigate(`/document/${data._id}`, { state: { message: 'Document created successfully!' } });
    } catch (error) {
      console.error('Failed to create document:', error);
      toast.error('Failed to create document. Please try again.');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div>
        <Title text1="Add" text2="Document" />
        <form className="card border-0 p-4 shadow-sm" style={{ width: '40rem' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              className="form-control bg-transparent border border-secondary-subtle"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              id="content"
              rows="10"
              className="form-control bg-transparent border border-secondary-subtle"
              placeholder="Enter Your Content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <input
              type="text"
              id="comment"
              className="form-control bg-transparent border border-secondary-subtle"
              placeholder="Enter Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Create</button>
        </form>
      </div>
    </div>
  );
};

export default AddDoc;
import React, { useEffect, useState } from 'react';
import Title from '../components/Title.js';
import { Link, useNavigate } from 'react-router-dom';
import DocItem from '../components/DocItem.js';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const [isFetched, setIsFetched] = useState(false); // To prevent duplicate fetch calls

  useEffect(() => {
    if (isFetched) return; // Prevent multiple calls

    const fetchDocuments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;

        if (!token) {
          toast.warn('Authentication required. Please log in.');
          throw new Error('User is not authenticated');
        }

        const { data } = await axios.get('http://localhost:8080/api/documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(data);
        setIsFetched(true); // Mark as fetched
      } catch (error) {
        console.log('Failed to fetch documents:', error);

        if (error.response?.status === 401) {
          toast.error('Session expired. Please log in again.');
        } else {
          toast.error('Failed to load documents. Please try again later.');
        }
        navigate('/login');
      }
    };

    fetchDocuments();
  }, [navigate, isFetched]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div style={{ flex: 1 }}>
          <Title text1="Dash" text2="board" />
        </div>
        <Link to="/document/add" className="btn btn-success mt-2">
          Add Doc
        </Link>
      </div>

      <div className="flex-grow-1 m-3">
        <div className="row gx-4 gy-3">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div key={doc._id} className="col-6 col-md-4 col-lg-3">
                <DocItem doc={doc} />
              </div>
            ))
          ) : (
            <p className="text-center w-100">No documents found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
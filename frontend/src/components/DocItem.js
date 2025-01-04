import React from 'react';
import { Link } from 'react-router-dom';

const DocItem = ({ doc }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header bg-secondary text-white text-center">
        <strong>{doc.title}</strong>
      </div>
      <div className="card-body d-flex flex-column">
        <p className="card-text">
          <small className="text-muted">
            Created on: {new Date(doc.createdAt).toLocaleDateString()}
          </small>
        </p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between">
            <Link className="btn btn-success btn-sm" to={`/document/${doc._id}`}>
              Open
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocItem;

import React, { useState } from 'react';
import Title from '../components/Title.js';
import ShareModal from '../components/ShareModel.js';

const Document = () => {
  // State to handle modal visibility
  const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Handle copying link
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Error copying link: ', err));
  };

  return (
    <div className="container mt-5 justify-content-center align-items-center">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div style={{ flex: 1 }}>
          <Title text1={"Your"} text2={"Document"} />
        </div>
        <div>
          <button className="btn btn-success m-2 rounded-pill" onClick={toggleModal}>Share</button>
          <ShareModal showModal={showModal} toggleModal={toggleModal} copyLink={copyLink} />
        </div>
        <button className="btn btn-secondary m-2 rounded-pill">Download</button>
      </div>
    </div>
  );
};

export default Document;

import React from 'react';

const ShareModal = ({ showModal, toggleModal, copyLink }) => {
  return (
    <div>
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent dark overlay
          }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="shareModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{
              maxWidth: '35%',
            }}
          >
            <div
              className="modal-content"
              style={{
                borderRadius: '1rem',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.64)', // Transparent white
                border: 'none',
              }}
            >
              <div className="modal-body">
                <div
                  className="card"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.06)', // White card
                    border: 'none',
                    borderRadius: '0.5rem',
                  }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title text-center"
                      style={{
                        color: '#444',
                        fontWeight: '600',
                      }}
                    >
                      Share this Document
                    </h5>

                    {/* Copy Link Button */}
                    <div className="d-flex justify-content-center mb-4">
                      <button
                        className="btn rounded-pill px-4"
                        onClick={copyLink}
                        style={{
                          backgroundColor: '#0d6efd',
                          color: '#fff',
                          boxShadow: '0 4px 8px rgba(13, 110, 253, 0.4)',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow =
                            '0 6px 12px rgba(13, 110, 253, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow =
                            '0 4px 8px rgba(13, 110, 253, 0.4)';
                        }}
                      >
                        Copy Link
                      </button>
                    </div>

                    {/* Social Media Share Buttons */}
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn"
                        style={{
                          backgroundColor: '#4267B2',
                          color: '#fff',
                          borderRadius: '0.5rem',
                        }}
                      >
                        Facebook
                      </button>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: '#0077b5',
                          color: '#fff',
                          borderRadius: '0.5rem',
                        }}
                      >
                        LinkedIn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  onClick={toggleModal}
                  style={{
                    backgroundColor: '#e0e0e0',
                    color: '#555',
                    borderRadius: '0.5rem',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareModal;
import React from 'react';

const ShareModal = ({ showModal, toggleModal, copyLink }) => {
  return (
    <div>
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(255, 253, 253, 0.5)', border: 'none'  }} tabIndex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '30%', border: 'none'  }}>
            <div className="modal-content" style={{ borderRadius: '1rem', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.48)', backgroundColor:'rgba(172, 171, 171, 0.44)', border: 'none' }}>
              <div className="modal-body">
                <div className="card" style={{backgroundColor:'rgba(252, 252, 252, 0.44)', border: 'none'}}>
                  <div className="card-body">
                    <h5 className="card-title">Share this document</h5>
                    {/* Copy Link Button */}
                    <div className="d-flex justify-content-center mb-3">
                      <button className="btn btn-outline-secondary rounded-pill" onClick={copyLink}>
                        Copy Link
                      </button>
                    </div>

                    {/* Social Media Share Buttons */}
                    <div className="d-flex justify-content-around">
                      <button className="btn btn-info">Facebook</button>
                      <button className="btn btn-info">Twitter</button>
                      <button className="btn btn-info">LinkedIn</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
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

// DownloadPDF.js
import React from 'react';
import { jsPDF } from 'jspdf';

const DownloadPDF = ({ contentId, filename = 'downloaded_page.pdf' }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Capture the content inside the element with the given contentId
    const content = document.getElementById(contentId);

    if (content) {
      doc.html(content, {
        callback: function (doc) {
          doc.save(filename); // Download the PDF with the specified filename
        },
        x: 10,
        y: 10,
      });
    }
  };

  return (
    <button onClick={downloadPDF} className="btn btn-secondary m-2 rounded-pill">
      Download
    </button>
  );
};

export default DownloadPDF;

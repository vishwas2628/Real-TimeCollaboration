import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="d-flex align-items-center text-center mb-3">
      <p 
        className="mb-0 me-2" 
        style={{ color: '#4a5568', fontSize: '2rem', fontWeight: 400 }} 
      >
        {text1}
        <span 
          style={{ color: '#2d3748', fontWeight: 500 }}
        >
          {text2}
        </span>
      </p>
      <div 
        style={{
          width: '15%',
          height: '1px',
          backgroundColor: '#2d3748',
        }}
      ></div>
    </div>
  );
};

export default Title;

import React from 'react';

const LoadingSpinner = ({ message = 'Synchronizing with HQ...' }) => {
  return (
    <div className="loading-wrapper reveal in">
      <div className="tp-pulse-loader"></div>
      <div className="text-muted-custom fw-bold tracking-wider text-uppercase small" style={{ letterSpacing: '2px' }}>
        {message}
      </div>
    </div>
  );
};

export default LoadingSpinner;

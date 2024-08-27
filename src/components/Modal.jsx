import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed min-h-screen inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-secondaryBackground dark:bg-dark-secondaryBackground rounded-lg p-4 z-10 max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

export default Modal;

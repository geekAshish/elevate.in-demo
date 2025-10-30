import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';

const AskQuestionModal = ({ isOpen, onClose, product, onSubmit }) => {
  const [question, setQuestion] = useState('');
  const textareaRef = useRef(null);

  // Auto-focus the textarea when the modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    } else {
      setQuestion(''); // Clear form on close
    }
  }, [isOpen]);

  // Handle 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim().length < 10) {
      // Basic validation
      alert('Please enter a question (minimum 10 characters).');
      return;
    }
    onSubmit(question);
  };

  if (!product) return null;

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* 2. Modal Panel */}
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center p-4 ${
          isOpen ? '' : 'pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-modal-title"
      >
        <div
          className={`relative w-full max-w-lg bg-white rounded-lg shadow-2xl transform transition-all duration-300 ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 id="question-modal-title" className="text-lg font-semibold text-gray-900">
              Ask a Question
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close modal"
            >
              <HiOutlineX size={24} />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-5">
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md overflow-hidden border">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-base font-semibold text-gray-900">₹{product.salePrice.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Form Input */}
              <div>
                <label htmlFor="question-textarea" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question:
                </label>
                <textarea
                  id="question-textarea"
                  ref={textareaRef}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows="5"
                  placeholder="Write your question here..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>
            
            {/* Footer / Actions */}
            <div className="flex items-center justify-end gap-3 p-4 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-orange-500 rounded-md shadow-sm hover:bg-orange-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AskQuestionModal;
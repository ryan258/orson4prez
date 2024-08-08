// components/GenerateButton.js
import React from 'react';
import './GenerateButton.css';

function GenerateButton({ onGenerate, isLoading }) {
  return (
    <button 
      onClick={onGenerate} 
      className="generate-button"
      disabled={isLoading}
    >
      {isLoading ? 'Generating...' : 'Generate New Campaign Posts'}
    </button>
  );
}

export default GenerateButton;
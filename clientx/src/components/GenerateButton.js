// components/GenerateButton.js
export function GenerateButton({ onGenerate }) {
    return (
      <button onClick={onGenerate} className="generate-button">
        Generate New Campaign Posts
      </button>
    );
  }
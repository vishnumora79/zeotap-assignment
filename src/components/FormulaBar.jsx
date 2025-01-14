import React from 'react';

const FormulaBar = ({ value, onChange, selectedCell }) => {
  return (
    <div className="formula-bar">
      <div className="selected-cell">
        {selectedCell ? `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 1}` : ''}
      </div>
      <div className="formula-input">
        <span className="fx">fx</span>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter formula or value"
        />
      </div>
    </div>
  );
};

export default FormulaBar;
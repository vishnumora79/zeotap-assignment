import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

const Cell = ({ 
  value, 
  onChange, 
  format, 
  isSelected,
  isInSelection,
  onMouseDown,
  onMouseMove,
  rowIndex, 
  colIndex 
}) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    onChange(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const cellStyle = {
    fontWeight: format?.bold ? 'bold' : 'normal',
    fontStyle: format?.italic ? 'italic' : 'normal',
    fontSize: format?.fontSize ? `${format.fontSize}px` : '14px',
    color: format?.color || '#000000',
  };

  return (
    <div 
      className={classNames('cell', {
        'selected': isSelected,
        'in-selection': isInSelection
      })}
      onDoubleClick={handleDoubleClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      style={cellStyle}
    >
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
};

export default Cell;
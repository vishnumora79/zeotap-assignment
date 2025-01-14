import React from 'react';
import { FaBold, FaItalic, FaFont, FaPalette, FaPlus, FaMinus } from 'react-icons/fa';

const Toolbar = ({ 
  onFormatChange, 
  onAddRow, 
  onDeleteRow, 
  onAddColumn, 
  onDeleteColumn,
  selectedCell,
  cellFormat 
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button 
          className={`toolbar-btn ${cellFormat?.bold ? 'active' : ''}`}
          onClick={() => onFormatChange('bold')}
        >
          <FaBold />
        </button>
        <button 
          className={`toolbar-btn ${cellFormat?.italic ? 'active' : ''}`}
          onClick={() => onFormatChange('italic')}
        >
          <FaItalic />
        </button>
        <select 
          className="font-size-select"
          value={cellFormat?.fontSize || '14'}
          onChange={(e) => onFormatChange('fontSize', e.target.value)}
        >
          {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
            .map(size => (
              <option key={size} value={size}>{size}</option>
            ))
          }
        </select>
        <input 
          type="color"
          value={cellFormat?.color || '#000000'}
          onChange={(e) => onFormatChange('color', e.target.value)}
          className="color-picker"
        />
      </div>
      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={onAddRow}>
          <FaPlus /> Row
        </button>
        <button className="toolbar-btn" onClick={onDeleteRow}>
          <FaMinus /> Row
        </button>
        <button className="toolbar-btn" onClick={onAddColumn}>
          <FaPlus /> Column
        </button>
        <button className="toolbar-btn" onClick={onDeleteColumn}>
          <FaMinus /> Column
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
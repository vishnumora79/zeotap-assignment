import React, { useState, useCallback } from 'react';
import Cell from './Cell';
import { spreadsheetFunctions } from '../utils/spreadsheetFunctions';

const INITIAL_ROWS = 50;
const INITIAL_COLS = 26;

const Grid = () => {
  const [data, setData] = useState(
    Array(INITIAL_ROWS).fill().map(() => Array(INITIAL_COLS).fill(''))
  );
  const [formatting, setFormatting] = useState(
    Array(INITIAL_ROWS).fill().map(() => Array(INITIAL_COLS).fill({}))
  );
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [dragging, setDragging] = useState(false);
  const [selection, setSelection] = useState(null);

  const getCellValue = useCallback((ref) => {
    const col = ref.match(/[A-Z]+/)[0];
    const row = parseInt(ref.match(/[0-9]+/)[0]) - 1;
    const colIndex = col.split('').reduce((acc, char) => 
      acc * 26 + char.charCodeAt(0) - 64, 0) - 1;
    return data[row][colIndex];
  }, [data]);

  const handleCellChange = (value, row, col) => {
    const newData = [...data];
    newData[row][col] = value;
    setData(newData);
    
    // Update dependent cells
    data.forEach((rowData, r) => {
      rowData.forEach((cellValue, c) => {
        if (typeof cellValue === 'string' && 
            cellValue.startsWith('=') && 
            cellValue.includes(`${String.fromCharCode(65 + col)}${row + 1}`)) {
          newData[r][c] = cellValue; // This will trigger re-evaluation
        }
      });
    });
  };

  const handleFormatChange = (type, value) => {
    if (!selectedCell) return;
    
    const newFormatting = [...formatting];
    const currentFormat = { ...newFormatting[selectedCell.row][selectedCell.col] };
    
    if (value === undefined) {
      currentFormat[type] = !currentFormat[type];
    } else {
      currentFormat[type] = value;
    }
    
    newFormatting[selectedCell.row][selectedCell.col] = currentFormat;
    setFormatting(newFormatting);
  };

  const addRow = () => {
    const newData = [...data];
    const newFormatting = [...formatting];
    newData.splice(selectedCell.row + 1, 0, Array(data[0].length).fill(''));
    newFormatting.splice(selectedCell.row + 1, 0, Array(data[0].length).fill({}));
    setData(newData);
    setFormatting(newFormatting);
  };

  const deleteRow = () => {
    if (data.length <= 1) return;
    const newData = [...data];
    const newFormatting = [...formatting];
    newData.splice(selectedCell.row, 1);
    newFormatting.splice(selectedCell.row, 1);
    setData(newData);
    setFormatting(newFormatting);
  };

  const addColumn = () => {
    const newData = data.map(row => {
      const newRow = [...row];
      newRow.splice(selectedCell.col + 1, 0, '');
      return newRow;
    });
    const newFormatting = formatting.map(row => {
      const newRow = [...row];
      newRow.splice(selectedCell.col + 1, 0, {});
      return newRow;
    });
    setData(newData);
    setFormatting(newFormatting);
  };

  const deleteColumn = () => {
    if (data[0].length <= 1) return;
    const newData = data.map(row => {
      const newRow = [...row];
      newRow.splice(selectedCell.col, 1);
      return newRow;
    });
    const newFormatting = formatting.map(row => {
      const newRow = [...row];
      newRow.splice(selectedCell.col, 1);
      return newRow;
    });
    setData(newData);
    setFormatting(newFormatting);
  };

  const handleMouseDown = (row, col) => {
    setDragging(true);
    setSelection({ start: { row, col }, end: { row, col } });
  };

  const handleMouseMove = (row, col) => {
    if (!dragging) return;
    setSelection(prev => ({
      start: prev.start,
      end: { row, col }
    }));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div 
      className="grid-container"
      onMouseUp={handleMouseUp}
    >
      <div className="header-row">
        <div className="corner-cell"></div>
        {data[0].map((_, index) => (
          <div key={index} className="column-header">
            {String.fromCharCode(65 + index)}
          </div>
        ))}
      </div>
      <div className="grid-body">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="row-header">{rowIndex + 1}</div>
            {row.map((cellValue, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={spreadsheetFunctions.evaluateFormula(cellValue, getCellValue)}
                onChange={(value) => handleCellChange(value, rowIndex, colIndex)}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseMove={() => handleMouseMove(rowIndex, colIndex)}
                format={formatting[rowIndex][colIndex]}
                isSelected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
                isInSelection={selection && isInSelection(rowIndex, colIndex, selection)}
                rowIndex={rowIndex}
                colIndex={colIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const isInSelection = (row, col, selection) => {
  const minRow = Math.min(selection.start.row, selection.end.row);
  const maxRow = Math.max(selection.start.row, selection.end.row);
  const minCol = Math.min(selection.start.col, selection.end.col);
  const maxCol = Math.max(selection.start.col, selection.end.col);
  
  return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
};

export default Grid;
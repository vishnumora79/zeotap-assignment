# React Sheets Clone

A web-based spreadsheet application that mimics core Google Sheets functionality, built with React and modern web technologies.

## Technology Stack

### Core Technologies
- **React (18.3)**: Chosen for its efficient rendering and component-based architecture, perfect for handling complex UI updates in a spreadsheet.
- **Vite**: Used as the build tool for its exceptional development experience and fast hot module replacement.
- **JavaScript (ES6+)**: Leverages modern JavaScript features for clean, maintainable code.

### Dependencies
- **mathjs**: Powers mathematical expression evaluation in formulas, providing robust calculation capabilities.
- **classnames**: Simplifies conditional class name handling for dynamic styling.
- **react-icons**: Provides a comprehensive set of icons for the toolbar interface.

## Data Structures

### Grid Data Management
```javascript
// Main grid data structure
const [data, setData] = useState(
  Array(INITIAL_ROWS).fill().map(() => Array(INITIAL_COLS).fill(''))
);
```
- Uses a 2D array for O(1) cell access
- Each cell contains raw string value (including formulas)
- Dimensions: INITIAL_ROWS × INITIAL_COLS (50×26 by default)

### Cell Formatting
```javascript
const [formatting, setFormatting] = useState(
  Array(INITIAL_ROWS).fill().map(() => Array(INITIAL_COLS).fill({}))
);
```
- Parallel 2D array storing formatting information
- Each cell contains an object with formatting properties:
  - bold: boolean
  - italic: boolean
  - fontSize: number
  - color: string

### Selection Management
```javascript
const [selection, setSelection] = useState({
  start: { row: 0, col: 0 },
  end: { row: 0, col: 0 }
});
```
- Tracks current cell selection for operations
- Supports single cell and range selections
- Used for drag operations and formatting

## Key Features

### Formula Evaluation
- Custom formula parser using regex for cell references
- Supports mathematical operations and built-in functions
- Cell dependency tracking for formula updates

### Built-in Functions
1. Mathematical Functions:
   - SUM
   - AVERAGE
   - MAX
   - MIN
   - COUNT

2. Data Quality Functions:
   - TRIM
   - UPPER
   - LOWER

### Performance Considerations
- Cell rendering optimization using React's virtual DOM
- Efficient updates through state management
- Lazy evaluation of formulas
- Event delegation for cell selection

## Project Structure
```
src/
├── components/         # React components
│   ├── Cell.jsx       # Individual cell component
│   ├── Grid.jsx       # Main grid component
│   ├── Toolbar.jsx    # Formatting toolbar
│   └── FormulaBar.jsx # Formula input bar
├── utils/
│   └── spreadsheetFunctions.js  # Formula evaluation logic
└── App.jsx            # Root component
```

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/vishnumora79/zeotap-assignment.git
cd zeotap-assignment
```


#### Run the application
```bash
npm install
npm run dev 
```

## Development Decisions

1. **Component Architecture**:
   - Separate components for Cell, Grid, Toolbar, and FormulaBar for maintainability
   - Clear separation of concerns between UI and logic

2. **State Management**:
   - React's useState for local state management
   - Prop drilling minimized through component composition
   - No external state management library needed due to localized state updates

3. **Performance Optimizations**:
   - Cell components only re-render when their data or formatting changes
   - Formula evaluation cached until dependencies change
   - Event delegation for efficient event handling

4. **Styling Approach**:
   - CSS modules for component-specific styling
   - Flexible grid layout for spreadsheet structure
   - Responsive design considerations

## Future Improvements

1. **Performance**:
   - Implement virtual scrolling for large datasets
   - Add web workers for complex calculations
   - Optimize formula parsing for large ranges

2. **Features**:
   - Add more spreadsheet functions
   - Implement undo/redo functionality
   - Add cell merging support
   - Enable column resizing

3. **Data Persistence**:
   - Add save/load functionality
   - Implement real-time collaboration
   - Add export to CSV/Excel

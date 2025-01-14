import { evaluate } from 'mathjs';

export const spreadsheetFunctions = {
  SUM: (range) => {
    return range.reduce((sum, value) => {
      const num = Number(value);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
  },

  AVERAGE: (range) => {
    const sum = spreadsheetFunctions.SUM(range);
    const count = range.filter(value => !isNaN(Number(value))).length;
    return count > 0 ? sum / count : 0;
  },

  MAX: (range) => {
    const numbers = range
      .map(value => Number(value))
      .filter(num => !isNaN(num));
    return numbers.length > 0 ? Math.max(...numbers) : 0;
  },

  MIN: (range) => {
    const numbers = range
      .map(value => Number(value))
      .filter(num => !isNaN(num));
    return numbers.length > 0 ? Math.min(...numbers) : 0;
  },

  COUNT: (range) => {
    return range.filter(value => !isNaN(Number(value))).length;
  },

  TRIM: (value) => {
    return String(value).trim();
  },

  UPPER: (value) => {
    return String(value).toUpperCase();
  },

  LOWER: (value) => {
    return String(value).toLowerCase();
  },

  evaluateFormula: (formula, getCellValue) => {
    if (!formula.startsWith('=')) return formula;

    try {
      const expression = formula.substring(1);
      
      // Handle built-in functions
      if (expression.match(/^[A-Z]+\(/)) {
        const functionMatch = expression.match(/^([A-Z]+)\((.*)\)$/);
        if (functionMatch) {
          const [_, functionName, args] = functionMatch;
          const range = args.split(',').map(ref => {
            // Handle cell references (e.g., A1, B2)
            if (ref.match(/^[A-Z]+[0-9]+$/)) {
              return getCellValue(ref);
            }
            return ref.trim();
          });

          if (spreadsheetFunctions[functionName]) {
            return spreadsheetFunctions[functionName](range);
          }
        }
      }

      // Handle cell references in mathematical expressions
      const withReferences = expression.replace(/[A-Z]+[0-9]+/g, (match) => {
        return getCellValue(match);
      });

      return evaluate(withReferences);
    } catch (error) {
      return '#ERROR!';
    }
  }
};
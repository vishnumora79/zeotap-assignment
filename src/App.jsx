import React from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Sheets</h1>
      </header>
      <main className="app-main">
        <Grid />
      </main>
    </div>
  );
}

export default App;
// App.js
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import RiverDetails from './pages/RiverDetails';

function App() {
  return (
    <Dashboard/>        
    
  );
}

export default App;

import logo from './logo.svg';
import * as React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

//Custom Components
import HomePage from "./Components/HomePage.js";
import SearchPage from "./Components/SearchPage.js";

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="searchresults" element={<SearchPage />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;

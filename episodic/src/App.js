import logo from './logo.svg';
import * as React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Components.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

//Custom Components
import HomePage from "./Components/HomePage.js";
import SearchPage from "./Components/SearchPage.js";
import NavBar from "./Components/NavBar.js";

const theme = createTheme({
  palette: {
    primary: {
      main: '#a84d67',
      contrastText: '#d7c0ad',
    },
    secondary: {
      main: '#b4ab93',
      contrastText: '#533745',
    },
    action:{
      active: '#d7c0ad',
    },
    text: {
      primary: '#d7c0ad',
      secondary: 'rgba(215,192,173,0.83)',
      hint: '#d6a887',
    },
    background: {
      default: '#533745',
      paper: 'rgba(153,96,72,0.3)',
    },
    divider: 'rgba(215,192,173,0.5)'
  },
  props: {
    MuiAppBar:{
      color: 'secondary',
    }
  }
});


function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes >
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="searchresults" element={<SearchPage />} />
          </Routes >
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

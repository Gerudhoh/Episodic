import logo from './logo.svg';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Components.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

//Custom Components
import NavBar from "./Components/NavBar.js";
import HomePage from "./Components/HomePage.js";
import SearchPage from "./Components/SearchPage.js";
import ProfilePage from "./Components/ProfilePage.js";
import ProfileListView from "./Components/ProfileListView.js";
import ExploreListView from "./Components/ExploreListView.js";

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
      secondary: '#d7c0ad',
    },
    background: {
      default: '#533745',
      paper: 'rgba(153,96,72,0.3)',
    },
    divider: 'rgba(215,192,173,0.5)'
  },
  typography : {
    allVariants: {
      color: '#d7c0ad'
    },
    color: '#d7c0ad',
    fontFamily: 'Poppins',
    h1: {
      fontSize: '5.378em',
    },
    h2: {
      fontSize: '3.842em',
    },
    h3: {
      fontSize: '2.744em',
      color: '#d7c0ad',
    },
    h4: {
      fontSize: '1.96em',
    },
    p: {
      fontSize: '1em',
    }
  },
  components: {
    MuiAppBar:{
      defaultProps:{
        color: 'transparent',
      },
    },
    MuiIcon:{
      props:{
        color: 'action',
      },
    },
    MuiButton:{
      props:{
        color: 'secondary',
      },
    },
  }
})

function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes >
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="searchresults" element={<SearchPage />} />
            <Route exact path="profile" element={<ProfilePage />} />
            <Route path="userlist/:name" element={<ProfileListView userName="userName"/>} />
            <Route path="userlist/" element={<ProfileListView userName="userName"/>} />
            <Route path="explorelist/:name" element={<ExploreListView />} />
          </Routes >
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

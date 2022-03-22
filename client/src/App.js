import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {checkAuth, getCookieData} from "./lib/CookieData.js"
import {BrowserRouter} from "react-router-dom";
import history from './Components/history';
import './Components.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//Custom Components
import NavBar from "./Components/NavBar";
import RouteSwitch from "./Components/RouteSwitch";

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
    MuiCardMedia: {
      props:{
        color: '#d7c0ad',
      },
    }
  }
})

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      username: "",
      email: "",
      id: null,
    };

    this.updateAuth = this.updateAuth.bind(this);
    this.removeAuth = this.removeAuth.bind(this);
    this.checkAuthData = this.checkAuthData.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.checkAuthData();
  }

  async checkAuthData() {
    let authData = getCookieData();
    console.log(authData);

    if(authData.username && authData.token) { 
      let authCheck = await checkAuth(authData.username, authData.token);
      console.log(authCheck);
      console.log(authCheck.length > 0)

      this.setState({username: authData.username, email: authData.email, userId: authData.userId});

      if(authCheck.length > 0) {
        this.setState({auth: true})
      }
      else {
        this.setState({auth: false})
      }
    }
    else {
      this.setState({auth: false})
    }
  }

  async updateAuth() {
    let authData = getCookieData();
    console.log(authData);

    if(authData.username && authData.token) { 
      this.setState({
        auth: true
      })
      
      await history.push("/");
      window.scrollTo(0, 0);
      window.location.reload();
    }
  }

  removeAuth() {
    console.log("Remove auth")
    document.cookie = `username=;`;
    document.cookie = `email=;`;
    document.cookie = `token=;`;
    document.cookie = `userId=;`;

    this.setState({
      auth: false
    })
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <BrowserRouter history={history}>
          <NavBar auth={this.state.auth}  checkAuthData={this.checkAuthData} updateAuth={this.updateAuth} removeAuth={this.removeAuth} username={this.state.username} email={this.state.email} userId={this.state.userId}/>
          <RouteSwitch auth={this.state.auth} checkAuthData={this.checkAuthData}  updateAuth={this.updateAuth} removeAuth={this.removeAuth} username={this.state.username} email={this.state.email} userId={this.state.userId}/>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;

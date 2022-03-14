import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {checkAuth, getCookieData} from "./lib/CookieData.js"
import {BrowserRouter} from "react-router-dom";
import history from './Components/history';

//Custom Components
import NavBar from "./Components/NavBar";
import RouteSwitch from "./Components/RouteSwitch";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      username: "",
      email: "",
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

      this.setState({username: authData.username});
      this.setState({email: authData.email});

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
    this.setState({
      auth: false
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter history={history}>
        <NavBar auth={this.state.auth}  checkAuthData={this.checkAuthData} updateAuth={this.updateAuth} removeAuth={this.removeAuth} username={this.state.username} email={this.state.email}/>
        <RouteSwitch auth={this.state.auth} checkAuthData={this.checkAuthData}  updateAuth={this.updateAuth} removeAuth={this.removeAuth} username={this.state.username} email={this.state.email}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

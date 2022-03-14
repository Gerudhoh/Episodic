import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {checkAuth, logOut, getCookieData} from "./lib/CookieData.js"

//Custom Components
import NavBar from "./Components/NavBar";
import RouteSwitch from "./Components/RouteSwitch";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
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

    if(authData.username && authData.token) { 
      let authCheck = await checkAuth(authData.username, authData.token);
      console.log(authCheck);
      console.log(authCheck.length > 0)

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

  updateAuth() {
    this.setState({
      auth: true
    })
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
        <NavBar auth={this.state.auth}  updateAuth={this.updateAuth} removeAuth={this.removeAuth}/>
        <RouteSwitch auth={this.state.auth} updateAuth={this.updateAuth} removeAuth={this.removeAuth}/>
      </div>
    );
  }
}

export default App;

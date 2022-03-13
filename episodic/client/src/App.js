import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {checkAuth, logOut, getCookieData} from "./lib/CookieData.js"

//Custom Components
import HomePage from "./Components/HomePage.js";
import NavBar from "./Components/NavBar.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false
    };

    this.updateAuth = this.updateAuth.bind(this);
    this.removeAuth = this.removeAuth.bind(this);
    this.checkAuthData = this.checkAuthData.bind(this);
  }

  componentDidMount() {
    this.checkAuthData();
  }

  async checkAuthData() {
    let authData = getCookieData();
    console.log(authData);
    console.log(authData.token);

    if(authData.username !== undefined && authData.token !== undefined) {
      console.log("Check auth")
      let authCheck = await checkAuth(authData.username, authData.token);

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
    this.setState({
      auth: false
    })
  }

  render() {
    return (
      <div className="App">
          <NavBar auth={this.state.auth}  updateAuth={this.updateAuth} removeAuth={this.removeAuth}/>
          <HomePage auth={this.state.auth}  updateAuth={this.updateAuth} removeAuth={this.removeAuth} />
      </div>
    );
  }
}

export default App;

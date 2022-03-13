import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

//Logged out routes
import Login from "./LoginForm";
import SignUp from "./SignUpForm";

//Logged in routes
import HomePage from './HomePage';

class RouteSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: props.auth
    };
    this.changeAuth = this.changeAuth.bind(this);
    this.changeRemoveAuth = this.changeRemoveAuth.bind(this);
  }

  changeAuth() {
    this.props.updateAuth();
  }

  changeRemoveAuth() {
    this.props.removeAuth();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
            <Routes >
                {/* Logged Out routes */}
                <Route exact path="/login" element={<Login changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route exact path="/signup" element={<SignUp changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>

                {/* Logged In routes */}
                <Route exact path="/" element={<HomePage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
            </Routes>
         </BrowserRouter>
      </div>
    );
  }
}

export default RouteSwitch;
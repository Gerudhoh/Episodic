import React from 'react';
import {Route, Routes} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import history from './history';

//Logged out routes
import Login from "./LoginForm";
import SignUp from "./SignUpForm";

//Logged in routes
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import Profile from "./ProfilePage";
import TestPodInfo from "./TestPodInfoPage";


class RouteSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: props.auth,
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
            <Routes >
                {/* Logged Out routes */}
                <Route exact path="/login" element={<Login changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route exact path="/signup" element={<SignUp changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>

                {/* Logged In routes */}
                <Route exact path="/" element={<HomePage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route exact path="/searchresults" element={<SearchPage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route exact path="/profile" element={<Profile changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route exact path="//info/Getting%20Literate" element={<TestPodInfo changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
            </Routes>
      </div>
    );
  }
}

export default RouteSwitch;
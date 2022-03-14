import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

//Logged out routes
import Login from "./LoginForm";
import SignUp from "./SignUpForm";

//Logged in routes
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import PodcastInfoPage from './PodcastInfoPage';

class RouteSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: props.auth
    };
    this.changeAuth = this.changeAuth.bind(this);
    this.changeRemoveAuth = this.changeRemoveAuth.bind(this);
    this.checkAuthData = this.checkAuthData.bind(this);
  }

  checkAuthData() {
    this.props.checkAuthData();
  }

  async changeAuth() {
    await this.props.updateAuth();
  }

  changeRemoveAuth() {
    this.props.removeAuth();
  }

  render() {
    return (
      <div>
            <Routes >
                {/* Logged Out routes */}
                <Route exact path="/login" element={<Login changeAuth={this.changeAuth}  checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route exact path="/signup" element={<SignUp changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route path="/info/*" element={<PodcastInfoPage changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>

                {/* Logged In routes */}
                <Route exact path="/" element={<HomePage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route exact path="/searchresults" element={<SearchPage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route exact path="/profile" element={<ProfilePage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} username={this.props.username}/>}/>
            </Routes>
      </div>
    );
  }
}

export default RouteSwitch;
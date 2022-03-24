import React from 'react';
import {Route, Routes} from "react-router-dom";

//Logged out routes
import Login from "./LoginForm";
import SignUp from "./SignUpForm";

//Logged in routes
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import PodcastInfoPage from './PodcastInfoPage';
import EpisodeInfoPage from './EpisodeInfoPage';
import TrendingPage from './TrendingPage';
import SingleListView from './SingleListView';
import ProfileListView from './ProfileListView';
import RandomEpPage from './RandomEpPage';

class RouteSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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

                <Route path="/episodeinfo/*" element={<EpisodeInfoPage changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent" userId={this.props.userId}/>}/>
                <Route path="/info/*" element={<PodcastInfoPage changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent" userId={this.props.userId}/>}/>
                <Route path="/trending" element={<TrendingPage changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/>}/>
                <Route path="/randomep" element={<RandomEpPage changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent" userId={this.props.userId}/>}/>

                {/* Logged In routes */}
                <Route exact path="/" element={<HomePage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
                <Route exact path="/searchresults" element={<SearchPage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
                <Route exact path="/profile" element={<ProfilePage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
                <Route path="/userlist/*" element={<ProfileListView changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
                <Route path="/alluserlists/*" element={<ProfileListView changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
            </Routes>
      </div>
    );
  }
}

export default RouteSwitch;

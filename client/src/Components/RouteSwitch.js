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
    this.updateUserFriends = this.updateUserFriends.bind(this)
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

  async updateUserActivity() {
    await this.props.getUserActivity();
  }

  async updateUserFriends() {
    await this.props.getUserFriends();
  }

  render() {
    return (
      <div>
            <Routes >
                {/* Logged Out routes */}
                <Route exact path="/login" element={<Login changeAuth={this.changeAuth}  checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} userId={this.props.userId} className="tabContent"/>}/>
                <Route exact path="/signup" element={<SignUp changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} userId={this.props.userId} className="tabContent"/>}/>
                
                <Route path="/episodeinfo/*" element={<EpisodeInfoPage updateUserFriends={this.updateUserFriends} updateUserActivity={this.updateUserActivity} changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent" userId={this.props.userId}/>}/>
                <Route path="/info/*" element={<PodcastInfoPage  updateUserFriends={this.updateUserFriends} updateUserActivity={this.updateUserActivity} changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent" userId={this.props.userId}/>}/>
                <Route path="/trending" element={<TrendingPage updateUserFriends={this.updateUserFriends} updateUserActivity={this.updateUserActivity} changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} userId={this.props.userId} className="tabContent" /> }/>
                <Route path="/randomep" element={<RandomEpPage updateUserFriends={this.updateUserFriends} updateUserActivity={this.updateUserActivity} changeAuth={this.changeAuth} checkAuthData={this.checkAuthData}  changeRemoveAuth={this.changeRemoveAuth} className="tabContent" userId={this.props.userId}/>}/>

                {/* Logged In routes */}
                <Route exact path="/" element={<HomePage changeAuth={this.changeAuth} updateUserFriends={this.updateUserFriends} updateUserActivity={this.updateUserActivity} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} friendActivity={this.props.friendActivity} allFriends={this.props.allFriends} myActivity={this.props.myActivity} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
                <Route exact path="/searchresults" element={<SearchPage changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
                <Route exact path="/profile" element={<ProfilePage changeAuth={this.changeAuth} updateUserFriends={this.updateUserFriends} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} allFriends={this.props.allFriends} myActivity={this.props.myActivity} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
                <Route path="/userlist/*" element={<ProfileListView changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
                <Route path="/alluserlists/*" element={<ProfileListView changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent" auth={this.props.auth} email={this.props.email} username={this.props.username} userId={this.props.userId}/>}/>
            </Routes>
      </div>
    );
  }
}

export default RouteSwitch;

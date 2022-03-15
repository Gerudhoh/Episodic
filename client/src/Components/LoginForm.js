import React from 'react';
import history from './history';

//Material UI Components
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {checkLogin, getCookieData, checkAuth} from "../lib/CookieData.js"


//Styling

  const UserDescriptionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center"
  }

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorLabel: "",
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.checkAuthData = this.checkAuthData.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    this.checkAuthData();
  }

  async checkAuthData() {
    this.props.checkAuthData();
  }

  async signUp() {
    await history.push("/signup");
    window.scrollTo(0, 0);
    window.location.reload();
  }

  updateUsername(e) {
    this.setState({username: e.target.value, errorLabel: ""})
  }

  updatePassword(e) {
    this.setState({password: e.target.value, errorLabel: ""})
  }

  async submitLogin() {
    this.setState({ errorLabel: "" })
    let response = await checkLogin(this.state.username, this.state.password);

    if(response.err === undefined) {
      var date = new Date();
      date.setTime(date.getTime()+(2*60*60*1000));
      var expires = date.toGMTString();

      document.cookie = `username=${response.username}; expires=${expires};`;
      document.cookie = `email=${response.email}; expires=${expires};`;
      document.cookie = `token=${response.token}; expires=${expires};`;

      await this.props.changeAuth();
    }
    else if(response.err === "no username found") {
      this.setState({ errorLabel: "Username/password is incorrect." })
    }
    else {
      this.setState({ errorLabel: "An unexpected error occured." })
    }
  }

  render() {
    return (
        <Grid container display="flex" spacing={2} justifyContent="center" alignItems="flex-start">
        <Grid container style={UserDescriptionStyle} item lg={3} spacing={2} >
        <Grid item lg={12} >
          <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 10, display: { xs: 'none', md: 'flex' } }}
              >
                Login
              </Typography>
              <p >Username:</p>
                <Input
                variant="outlined"
                id="username"
                type="text"
                onChange={this.updateUsername}
                value={this.state.username}
                />
                <p >Password:</p>
                <Input
                variant="outlined"
                id="password"
                type="password"
                onChange={this.updatePassword}
                value={this.state.password}
                />
                </Grid>
                <Grid item lg={12} >
            <Button variant="text" color="secondary"  onClick={this.signUp}>Sign Up</Button>
            <Button  onClick={this.submitLogin}>Submit</Button>
            <br/><br/><br/>
            <p >{ this.state.errorLabel }</p>
            </Grid>
    </Grid>
    </Grid>
    );
  }
}

export default LoginForm;
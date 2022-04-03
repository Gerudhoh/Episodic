import * as React from 'react';
import { Link } from "react-router-dom";
//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

//Custom Components
import ActivityCard from "./ActivityCard.js";


  const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

class MyActivity extends React.Component {
  constructor(props) {
    super(props);
    let success = JSON.parse(localStorage.getItem('showSuccess')) || false;
    this.state = {
      myActivity: [],
      friendName: "",
      list: {},
      allLists: [],
      showSuccess: success,
      showError: false
    };
  }

  componentDidMount() {
    this.getUserActivity();
    localStorage.setItem( 'showSuccess', false );
  }

  getUserActivity = async e => {
    //e.preventDefault();
    console.log(this.props.userId);
    let response = await fetch('/api/v1/user_activity/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.userId }),
    });
    let body = await response.json();
    if (body.noUser === true) {
      await delay(1000); //in case user is already logged in, wait for the auth
      let response = await fetch('/api/v1/user_activity/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.props.userId }),
      });
      body = await response.json();
    }

    console.log(body);

    this.setState({ myActivity: body });
  };

  render() {
    return (
      <Box container>
      {this.state.showSuccess ? (<React.Fragment></React.Fragment>) : (null)}
        <List>
          {this.state.myActivity.map((item) => (
            <ActivityCard key={item.username} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.username} userId={this.props.userId} activitySize={this.props.activitySize}/>
          ))}
        </List>
      </Box>
    );
  }
}

export default MyActivity
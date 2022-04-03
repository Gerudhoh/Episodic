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

class MyActivity extends React.Component {
  constructor(props) {
    super(props);
    let success = JSON.parse(localStorage.getItem('showSuccess')) || false;
    this.state = {
      allFriends: [],
      friendName: "",
      list: {},
      allLists: [],
      showSuccess: success,
      showError: false,
      userId: this.props.userId
    };
  }

  componentDidMount() {
    this.getUserActivity();
    localStorage.setItem( 'showSuccess', false );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.setState({ userId: nextProps.userId })
      this.getUserActivity();
    }
  }

  getUserActivity = async e => {
    //e.preventDefault();
    if (!this.state.userId) return;
    let response = await fetch('/api/v1/user_activity/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.userId }),
    });
    let body = await response.json();

    console.log(body);

    this.setState({ allFriends: body });
  };

  render() {
    return (
      <Box container>
      {this.state.showSuccess ? (<React.Fragment></React.Fragment>) : (null)}
        <List>
          {this.state.allFriends.map((item) => (
            <ActivityCard key={item.username} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.username} userId={this.state.userId} activitySize={this.props.activitySize}/>
          ))}
        </List>
      </Box>
    );
  }
}

export default MyActivity
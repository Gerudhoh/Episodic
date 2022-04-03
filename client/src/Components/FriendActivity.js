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
import Autocomplete from '@mui/material/Autocomplete';

//Custom Components
import ActivityCard from "./ActivityCard.js";

  const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

class FriendActivity extends React.Component {
  constructor(props) {
    super(props);
    let success = JSON.parse(localStorage.getItem('showSuccess')) || false;
    this.state = {
      allFriends: [],
      allUsers: [],
      friendName: "",
      list: {},
      allLists: [],
      showSuccess: success,
      showError: false
    };
  }

  componentDidMount() {
    this.getUserFriends();
    this.getUsers();
    localStorage.setItem( 'showSuccess', false );
  }

  getUserFriends = async e => {
    //e.preventDefault();
    console.log(this.props.userId);
    let response = await fetch('/api/v1/user_activity/get/friend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.userId }),
    });
    let body = await response.json();
    if (body.noUser === true) {
      await delay(1000); //in case user is already logged in, wait for the auth
      let response = await fetch('/api/v1/user_activity/get/friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.props.userId }),
      });
      body = await response.json();
    }

    //console.log(body);

    this.setState({ allFriends: body });
  };

  getUsers = async e => {
    let response = await fetch('/api/v1/user/get/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    let body = await response.json();

    this.setState({ allUsers: body.users });
  };

  addFriend = async e => {
    e.preventDefault();
    this.setState({ showError: false });
    this.setState({ showSuccess: false });
    console.log(this.state.friendName);
    console.log(this.state);
    const response = await fetch('/api/v1/user/add/friend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search_term: this.state.friendName, id: this.props.userId}),
    });
    const body = await response.json();
    console.log(body);
    if (!body.success) {
      this.setState({ showError: true });
      return;
    }
    localStorage.setItem( 'showSuccess', true );

    window.location.reload(false); // refreshing here because i can't figure out how to reload the listhighlights from here
  };

  onNameChange = (event, value) => {
    this.setState({
      friendName: value
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.friendName);
    });
  }

  render() {
    return (
      <Box container>
      {this.state.showError ? (<Alert severity="error">
        Error: Could not add friend.
      </Alert>) : (null)}
      {this.state.showSuccess ? (<React.Fragment></React.Fragment>) : (null)}
        <List>
          {this.state.allFriends.map((item) => (
            <ActivityCard key={item.id} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.username} userId={this.props.userId} activitySize={this.props.activitySize}/>
          ))}
        </List>
        <Box component="form" onSubmit={this.addFriend}>
          <Stack direction="row" spacing={2} justifyContent="flex-start">
          <Autocomplete
              freeSolo
              fullWidth
              id="autofill-add-friend"
              disableClearable
              options={this.state.allUsers.map((option) => option.username)}
              onChange={this.onNameChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  value={this.state.friendName}
                  label="Friend Username/Email"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <Button variant="contained" type="submit">Add</Button>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default FriendActivity
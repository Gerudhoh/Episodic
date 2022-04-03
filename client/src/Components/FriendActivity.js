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

const friends = [
    {
      name: "name1",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "",
      }
    },

    {
      name: "name2",
      activityType: "newList",
      activityInfo: {
          friendName: "list1",
          images: [
            {
              img: '/pepekingprawn.jpg',
              title: 'Breakfast',
            },
            {
              img: '/pepekingprawn.jpg',
              title: 'Burger',
            },
            {
              img: '/pepekingprawn.jpg',
              title: 'Camera',
            },
          ]
        }
    },
    {
      name: "name3",
      activityType: "newList",
      activityInfo: {
        friendName: "list1",
        images: [
          {
            img: '/pepekingprawn.jpg',
            title: 'Breakfast',
          },
          {
            img: '/pepekingprawn.jpg',
            title: 'Burger',
          },
          {
            img: '/pepekingprawn.jpg',
            title: 'Camera',
          },
        ]
      }
    },
    {
      name: "name4",
      activityType: "listMove",
      activityInfo: {
        friendName: "list1",
        images: [
          {
            img: '/pepekingprawn.jpg',
            title: 'Breakfast',
          },
          {
            img: '/pepekingprawn.jpg',
            title: 'Burger',
          },
          {
            img: '/pepekingprawn.jpg',
            title: 'Camera',
          },
        ]
      }
    },
]

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
      showError: false,
      userId: this.props.userId
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.setState({ userId: nextProps.userId })
      this.getUserFriends();
    }
  }

  componentDidMount() {
    this.getUserFriends();
    this.getUsers();
    localStorage.setItem( 'showSuccess', false );
  }

  getUserFriends = async e => {
    if (!this.state.userId) return;
    let response = await fetch('/api/v1/user_activity/get/friend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.userId }),
    });
    let body = await response.json();

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
    const response = await fetch('/api/v1/user/add/friend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search_term: this.state.friendName, id: this.state.userId}),
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

  render() {
    return (
      <Box container>
      {this.state.showError ? (<Alert severity="error">
        Error: Could not add friend.
      </Alert>) : (null)}
      {this.state.showSuccess ? (<React.Fragment></React.Fragment>) : (null)}
        <List>
          {this.state.allFriends.map((item) => (
            <ActivityCard key={item.username} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.username} userId={this.state.userId} activitySize={this.props.activitySize}/>
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  value={this.state.friendName}
                  label="Friend Username/Email"
                  onChange={e => this.setState({ friendName: e.target.value })}
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
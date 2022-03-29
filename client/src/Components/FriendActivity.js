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
      friendName: "",
      list: {},
      allLists: [],
      showSuccess: success,
      showError: false
    };
  }

  componentDidMount() {
    this.getUserFriends();
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

    console.log(body);

    this.setState({ allFriends: body });
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

  render() {
    return (
      <Box container>
      {this.state.showError ? (<Alert severity="error">
        Error: Could not add friend.
      </Alert>) : (null)}
      {this.state.showSuccess ? (<React.Fragment></React.Fragment>) : (null)}
        <List>
          {this.state.allFriends.map((item) => (
            <ActivityCard key={item.username} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.username} userId={this.props.userId} activitySize={this.props.activitySize}/>
          ))}
        </List>
        <Box component="form" onSubmit={this.addFriend}>
          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <TextField
              required
              id="new-list-input"
              type="text"
              value={this.state.friendName}
              label="Friend Username/Email"
              onChange={e => this.setState({ friendName: e.target.value })}
            />
            <Button variant="contained" type="submit">Add</Button>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default FriendActivity
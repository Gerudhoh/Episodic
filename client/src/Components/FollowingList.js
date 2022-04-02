import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//Material UI Styles

//Custom Components
import UserInfo from "./UserInfo.js";

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

class FollowingList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allFriends: []
    };
  }

  componentDidMount() {
    this.getUserFriends();
  }

  getUserFriends = async e => {
    //e.preventDefault();
    let response = await fetch('/api/v1/user/get/friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.userId }),
    });
    let body = await response.json();
    if (body.noUser === true) {
      await delay(1000); //in case user is already logged in, wait for the auth
      let response = await fetch('/api/v1/user/get/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.props.userId }),
      });
      body = await response.json();
    }

    console.log(body);

    let friendNames = [];
    /*body.map((user) => {
      let tmp = { username: user.name, email: user.email };
      friendNames.push(tmp)
    });*/

    this.setState({ allFriends: friendNames });
  };

  render() {
    return (
      <Box container>
      <Typography>Following</Typography>
      <Stack>
      {this.state.allFriends.map((item) => (
        <UserInfo userName={item.username}/>
      ))}
      </Stack>
      {this.state.allFriends.length === 0 && 
        <Typography >You have no followers</Typography>
      }
    </Box>
    );
  }

}

export default FollowingList;

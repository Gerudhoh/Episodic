import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
//Material UI Styles

//Custom Components
import UserInfo from "./UserInfo.js";

/*
export default function FriendList(props) {

  return (
    <Box container>
      <Typography>Friends</Typography>
      <Stack>
      {friends.map((item) => (
        <UserInfo userName={item.name} avatarSize={props.userSize} fontSize={props.fontSize}/>
      ))}
      </Stack>
    </Box>
  );
}
*/

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

class FriendList extends React.Component {

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
    console.log(this.props.userId)

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

    this.setState({ allFriends: body });
  };

  render() {
    return (
      <Box container>
      <Typography>Friends</Typography>
      <Stack>
      {this.state.allFriends.map((item) => (
        <UserInfo userName={item.username} email={item.email}  avatarSize={this.props.userSize} fontSize={this.props.fontSize}/>
      ))}
      </Stack>

      {this.state.allFriends.length === 0 && 
        <Typography >You have no friends</Typography>
      }
    </Box>
    );
  }

}

export default FriendList;
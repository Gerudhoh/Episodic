import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//Material UI Styles

//Custom Components
import UserInfo from "./UserInfo.js";

class FollowingList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allFriends: [],
      userId: this.props.userId
    };
  }

  componentDidMount() {
    this.getUserFriends();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.setState({ userId: nextProps.userId })
      this.getUserFriends();
    }
  }

  getUserFriends = async e => {
    //e.preventDefault();

    if (!this.state.userId) return;
    let response = await fetch('/api/v1/user/get/friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.userId }),
    });
    let body = await response.json();

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

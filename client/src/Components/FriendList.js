import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
//Material UI Styles

//Custom Components
import UserInfo from "./UserInfo.js";

class FriendList extends React.Component {

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
    if (!this.state.userId) return;

    let response = await fetch('/api/v1/user/get/friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.userId }),
    });
    let body = await response.json();

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
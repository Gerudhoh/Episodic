import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';

//Custom Components
import ActivityCard from "./ActivityCard.js";
import UserInfo from "./UserInfo.js";


const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

class FriendActivityList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Box container>
      <Stack>
      <List>
      {this.props.friendActivity.map((item) => (
        <ActivityCard key={item.id} activityInfo={item.action_description} activityType={item.action_description} userName={item.username} userId={this.props.userId} activitySize={this.props.activitySize}/>
      ))}
      </List>
      </Stack>

      {this.props.friendActivity.length === 0 && 
        <Typography >No friend activity</Typography>
      }
    </Box>
    );
  }

}

export default FriendActivityList;
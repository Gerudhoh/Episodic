import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';

//Custom Components
import ActivityCard from "./ActivityCard.js";

class FriendActivityList extends React.Component {
  render() {
    return (
      <Box container>
      <Stack>
      <List>
      {this.props.friendActivity.map((item) => (
        <ActivityCard key={item.id} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.username} image={item.image} userId={this.props.userId} activitySize="medium"/>
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
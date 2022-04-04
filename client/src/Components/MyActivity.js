import * as React from 'react';
//Material UI Components
import Box from '@mui/material/Box';
import List from '@mui/material/List';

//Custom Components
import ActivityCard from "./ActivityCard.js";

class MyActivity extends React.Component {
  constructor(props) {
    super(props);
    let success = JSON.parse(localStorage.getItem('showSuccess')) || false;
    this.state = {
      showSuccess: success,
      showError: false,
      userId: this.props.userId
    };
  }

  componentDidMount(props) {
    localStorage.setItem( 'showSuccess', false );
  }

  render() {
    return (
      <Box container>
      {this.state.showSuccess ? (<React.Fragment></React.Fragment>) : (null)}
        <List>
          {this.props.myActivity.map((item) => (
            <ActivityCard key={item.username} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.username} userId={this.props.userId} activitySize={this.props.activitySize}/>
          ))}
        </List>
      </Box>
    );
  }
}

export default MyActivity
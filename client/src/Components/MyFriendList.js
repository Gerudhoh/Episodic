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
import Paper from '@mui/material/Paper';

//Custom Components
import ActivityCard from "./ActivityCard.js";


const CustomPaper = (props) => {
  return <Paper elevation={0} style={{backgroundColor: '#774c47', opacity: "1", overflowX: "scroll"}} {...props} />;
};

class MyFriendList extends React.Component {
  constructor(props) {
    super(props);
    let success = JSON.parse(localStorage.getItem('showSuccess')) || false;
    this.state = {
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
    }
  }

  componentDidMount() {
    this.getUsers();
    localStorage.setItem( 'showSuccess', false );
  }

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
          {this.props.allFriends.map((item) => (
            <ActivityCard key={item.id} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.username} userId={this.props.userId} activitySize="medium"/>
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
              PaperComponent={CustomPaper}
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

export default MyFriendList
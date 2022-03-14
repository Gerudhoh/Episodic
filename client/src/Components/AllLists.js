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

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

class AllLists extends React.Component {

  constructor(props) {
    super(props);
    let success = JSON.parse(localStorage.getItem('showSuccess')) || false;

    this.state = {
      listName: "",
      list: {},
      allLists: [],
      showSuccess: success,
      showError: false
    };
    
  }

  componentDidMount() {
    this.getUserLists();
    localStorage.setItem( 'showSuccess', false );
  }

  createList = async e => {
    e.preventDefault();
    this.setState({ showError: false });
    this.setState({ showSuccess: false });
    const response = await fetch('/api/v1/lists/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.listName }),
    });
    const body = await response.json();
    if (!body.list) {
      this.setState({ showError: true });
      return;
    }
    localStorage.setItem( 'showSuccess', true );

    window.location.reload(false); // refreshing here because i can't figure out how to reload the listhighlights from here
  };

  getUserLists = async e => {
    //e.preventDefault();
    let response = await fetch("/api/v1/lists/get/all/names");
    let body = await response.json();
    if(body.noUser === true) {
      await delay(1000); //in case user is already logged in, wait for the auth
      response = await fetch("/api/v1/lists/get/all/names");
      body = await response.json();
    }
    let listNames = [];
    body.lists.map((list) => listNames.push({ name: list.name }));
    this.setState({ allLists: listNames });
  };
  render() {
    return (
      <Box container>
      {this.state.showError ? (<Alert severity="error">
        Error: Could not create list.
      </Alert>) : (null)}
      {this.state.showSuccess ? (<React.Fragment></React.Fragment>) : (null)}
        <Typography variant="h4" component={Link} to="/userlist/all">Lists</Typography>
        <List>
          {this.state.allLists.map((item) => (
            <ListItem key={item.name} id={item.id}>
                <Link className="listLink" to={`/userlist/${item.name}`}>
                  {item.name}
                </Link>
            </ListItem>
          ))}
        </List>
        <Box component="form" onSubmit={this.createList}>
          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <TextField
              required
              id="new-list-input"
              type="text"
              value={this.state.listName}
              label="New List Name"
              onChange={e => this.setState({ listName: e.target.value })}
            />
            <Button variant="contained" type="submit">Create</Button>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default AllLists;

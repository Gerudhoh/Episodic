import * as React from 'react';
import { Link, Router } from "react-router-dom";
//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

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
    const response = await fetch("/api/v1/lists/get/all/temp");
    const body = await response.json();
    //const listMap = body.lists.map((list) => {list.name});
    let listNames = [];
    body.lists.map((list) => listNames.push({ name: list.name }));
    this.setState({ allLists: listNames });
    console.log(this.state.allLists);
  };
  render() {
    return (
      <Router>
      <Box container>
      {this.state.showError ? (<Alert severity="error">
        Error: Could not create list.
      </Alert>) : (null)}
      {this.state.showSuccess ? (<React.Fragment></React.Fragment>) : (null)}
        <Typography variant="h4" ><Link to="/userlist/all">Lists</Link></Typography>
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
      </Router>
    );
  }
}

export default AllLists;

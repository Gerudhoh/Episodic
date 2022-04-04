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

import { useEffect } from 'react';

class AllListsClass extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listName: "",
      list: {},
      allLists: [],
      showError: false,
      userId: this.props.userId
    };

  }

  componentDidMount() {
    this.getUserLists();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.setState({ userId: nextProps.userId });
      this.getUserLists();
    }
  }

  createList = async e => {
    e.preventDefault();
    if (!this.state.userId) return;
    this.setState({ showError: false });
    const response = await fetch('/api/v1/lists/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.listName, id: this.state.userId }),
    });
    const body = await response.json();
    if (!body.list) {
      this.setState({ showError: true });
      return;
    }

    window.location.reload(false); // refreshing here because i can't figure out how to reload the listhighlights from here
  };

  getUserLists = async e => {
    if (!this.state.userId) return;
    let response = await fetch('/api/v1/lists/get/all/names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.userId }),
    });
    let body = await response.json();
    let listNames = [];
    body.lists.map((list) => listNames.push({ name: list.name }));
    this.setState({ allLists: listNames });
  };

  render() {
    return (
      <Box>
        {this.state.userId ? (
          <Box container>
            {this.state.showError ? (<Alert severity="error">
              Error: Could not create list.
            </Alert>) : (null)}
            <Typography variant="h4" component={Link} to="/alluserlists">Lists</Typography>
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
        ) : (<Typography variant="h4">Lists</Typography>)}
      </Box>
    );
  }
}

export default function AllLists(props) {

  useEffect(() => {
  }, [props]);

  return (
    <AllListsClass userId={props.userId} />
  );
}
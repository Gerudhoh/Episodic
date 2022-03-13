import * as React from 'react';
import { useNavigate, Link } from "react-router-dom";
//Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';

import ListsHighlight from "./ListsHighlight.js"
const allLists = [
    {
      name: "listName1"
    },

    {
      name: "listName2"
    },
    {
      name: "listName3"
    },
    {
      name: "listName4"
    },
]


class AllLists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listName: "",
      list: {},
      allLists: [],
      showSuccess: JSON.parse(localStorage.getItem('showSuccess')) || false,
      showError: false
    };
  }

  componentDidMount() {
    this.getUserLists();
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
      <Box container>
        {this.state.showError ? (<Alert severity="error">
          Error: Could not create list.
        </Alert>) : (null)}

        {this.state.showSuccess ? (<Alert severity="success">
          Successfully created list!
        </Alert>) : (null)}

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

        <form onSubmit={this.createList}>
          <p>
            <strong>Create New List:</strong>
          </p>
          <input
            type="text"
            value={this.state.listName}
            onChange={e => this.setState({ listName: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </Box>
    );
  }
}

export default AllLists;

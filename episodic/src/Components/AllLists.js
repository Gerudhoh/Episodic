import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

class AllLists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allLists: []
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  getUserLists = async e => {
    //e.preventDefault();
    const response = await fetch("/api/v1/lists/get/all");
    const body = await response.json();
    //const listMap = body.lists.map((list) => {list.name});
    let listNames = [];
    body.lists.map((list) => listNames.push({name: list.name}))
    const listMap = [
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
    this.setState({ allLists: listNames })
  };
  render() {
    return (
      <Box container>
        <Typography>Lists</Typography>
        <List>
          {this.state.allLists.map((item) => (
            <ListItem key={item.name}>{item.name}</ListItem>
          ))}
        </List>
      </Box>
    );
  }
}

export default AllLists;
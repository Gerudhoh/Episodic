import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


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
export default function AllLists() {
  return (
    <Box container>
      <Typography>Lists</Typography>
      <List>
      {allLists.map((item) => (
        <ListItem key={item.name}>{item.name}</ListItem>
      ))}
      </List>
    </Box>
  );
}

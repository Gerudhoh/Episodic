import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Paper';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import ActivityCard from "./ActivityCard.js";

const friends = [
    {
      name: "name1",
      activityType: "newList",
      activityInfo: {}
    },

    {
      name: "name2",
      activityType: "newList",
      activityInfo: {}
    },
    {
      name: "name3",
      activityType: "newList",
      activityInfo: {}
    },
    {
      name: "name4",
      activityType: "listMove",
      activityInfo: {}
    },
]

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function FriendActivity() {
  return (
    <Box container>
      <Typography>Friend Activity</Typography>
      <Stack spacing={2}>
      {friends.map((item) => (
        <ActivityCard key={item.name} activityType={item.activityType} userName={item.name}/>
      ))}
      </Stack>

    </Box>
  );
}

import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
//Material UI Styles

//Custom Components
import UserInfo from "./UserInfo.js";


const friends = [
    {
      name: "name1",
      activityType: "newList"
    },

    {
      name: "name2",
      activityType: "newList"
    },
    {
      name: "name3",
      activityType: "newList"
    },
    {
      name: "name4",
      activityType: "listMove"
    },
]

export default function FriendList() {
  return (
    <Box container>
      <Typography>Friends</Typography>
      <Stack>
      {friends.map((item) => (
        <UserInfo userName={item.name}/>
      ))}
      </Stack>
    </Box>
  );
}

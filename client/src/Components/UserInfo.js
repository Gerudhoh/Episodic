import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

//Styling
const userInfoStyles={
  small:
  {
    avSize: { height: '20px', width: '20px' }
  },
  medium:{
    avSize: { height: '40px', width: '40px' }
  },
  large:{
    avSize: { height: '40px', width: '40px' }
  }
};

export default function userInfo(props) {
  return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar alt={props.userName} aria-label="user" sx={userInfoStyles[props.avatarSize].avSize} src="/static/images/avatar/2.jpg">
          
        </Avatar>
        <Typography fontSize={props.fontSize}>{props.userName}</Typography>
      </Stack>
  );
}

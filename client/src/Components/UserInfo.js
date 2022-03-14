import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const image = {
  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  title: 'Breakfast'
}
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
        <Avatar aria-label="user" sx={userInfoStyles[props.avatarSize].avSize}>
          <img src={image.img} />
        </Avatar>
        <Typography fontSize={props.fontSize}>{props.userName}</Typography>
      </Stack>
  );
}

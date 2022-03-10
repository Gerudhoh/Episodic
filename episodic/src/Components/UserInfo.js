import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const image = {
  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  title: 'Breakfast'
}

export default function userInfo(props) {
  return (
      <CardHeader
        avatar = {
          <Avatar aria-label="user">
            <img src={image.img} />
          </Avatar>
        }
        title={props.userName}
      />
  );
}

import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';

import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

import UserInfo from './UserInfo.js';
import AllLists from './AllLists.js';
import EpisodeCardList from './EpisodeCardList.js';
import ListPreview from './ListPreview.js';
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function EditListButtons(){
  return(
    <Stack direction="row" spacing={2}>
      <Fab size="small">
        <EditIcon fontSize="small"/>
      </Fab>
    </Stack>
  );
}

const list ={
  images: [
    {
      img: '/pepekingprawn.jpg',
      title: 'Breakfast',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'Burger',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'Camera',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'Camera',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'Camera',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'Camera',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'Camera',
    },
  ]
}

export default function ProfileListView(props){
  return(
    <Stack direction="row" spacing={2} padding="20px">
      <Stack spacing={2}>
        <Item><UserInfo avatarSize="large" fontSize="20px" userName={props.userName} /></Item>
        <Item><AllLists /></Item>
      </Stack>
      <Item>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h4">{props.listName}</Typography>
            <EditListButtons />
          </Stack>
          <Stack>
            <ListPreview listName={""} images={list.images} listSize={"large"}/>
          </Stack>
        </Stack>
      </Item>
    </Stack>
  );
}

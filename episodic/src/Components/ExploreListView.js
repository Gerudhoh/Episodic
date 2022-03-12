import * as React from 'react';
import {useLocation} from 'react-router-dom';
//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
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

const flag = "ownProfile";

const list ={
    name: 'list1',
    images: [
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP1',
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP2',
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP63',
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP4',
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP5',
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP6',
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP7',
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP8',
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'PKP9',
      },
    ],
};

export default function ExploreListView(props){
  const location = useLocation();
  return(
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h4">{props.listName}</Typography>
      </Stack>
      <Stack>
        <EpisodeCardList images={list.images} listSize={"large"}/>
      </Stack>
    </Stack>
  );

}

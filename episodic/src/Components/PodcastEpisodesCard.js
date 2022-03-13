//Packages
import * as React from 'react';

import {useLocation, withRouter} from 'react-router-dom';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';

import Rating from '@mui/material/Rating';


//Material UI Icons and Styling
import { styled } from '@mui/material/styles';
import CardActionButtons from './CardActionButtons.js';

const Item = styled(Paper)(({ theme }) => ({
  padding: 10,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function PodcastEpisode(props){
  return(
    <Stack direction="row">
      <img src={props.image} width="100px" height="auto"/>
      <Stack padding="10px">
        <Typography variant="h4">{props.title}</Typography>
        <Typography component="div" variant="p">{props.description}</Typography>
      </Stack>
    </Stack>
  );
}


export default function PodcastEpisodesCard(props){
  return(
    <Stack spacing={2} padding="10px">
      <Typography variant="h3">Episodes</Typography>
      {props.episodes.map((episode) =>
        <Item><PodcastEpisode
        image={props.image}
        title={episode.title}
        description={episode.description}/></Item>
      )}
    </Stack>
  );
}

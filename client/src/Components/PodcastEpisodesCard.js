//Packages
import * as React from 'react';

import { Route, Link } from "react-router-dom";

//import {useLocation, withRouter} from 'react-router-dom';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  padding: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function PodcastEpisode(props){
  const uri = `/info/${encodeURIComponent(props.podcastTitle)}/${encodeURIComponent(props.title)}`
  return(
    <Stack spacing={1} justifyContent="flex-start">
      <Typography variant="h4" textAlign="left" component={Link} to={uri} replace>{props.title}</Typography>
      <Stack direction="row" padding="10px" spacing={2}>
          <img src={props.image} width="20%" height="auto" alt={`Cover for ${props.title}`}/>
        <Typography variant="p" textAlign="left">{props.description}</Typography>
      </Stack>
    </Stack>
  );
}


export default function PodcastEpisodesCard(props){
  ;

  return(
    <Box component="div" height="45vh" m={2} sx={{overflow:'auto'}}>
      <Stack spacing={2} padding="10px">
        {props.episodes.map((episode) =>
          <Item><PodcastEpisode
          podcastTitle = {props.podcastTitle}
          image={episode.feedImage}
          title={episode.title}
          description={episode.description}/></Item>
        )}
      </Stack>
    </Box>
  );
}

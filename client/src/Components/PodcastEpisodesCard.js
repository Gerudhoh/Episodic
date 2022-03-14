//Packages
import * as React from 'react';

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
  return(
    <Stack direction="row" alignItems="center" >
      <img src={props.image} width="20%" height="auto" alt={`Cover for ${props.title}`}/>
      <Stack padding="10px">
        <Typography variant="h4">{props.title}</Typography>
        <Typography variant="p" textAlign="left">{props.description}</Typography>
      </Stack>
    </Stack>
  );
}


export default function PodcastEpisodesCard(props){
  return(
    <Box component="div" height="45vh" m={2} sx={{overflow:'auto'}}>
      <Stack spacing={2} padding="10px">
        {props.episodes.map((episode) =>
          <Item><PodcastEpisode
          image={episode.feedImage}
          title={episode.title}
          description={episode.description}/></Item>
        )}
      </Stack>
    </Box>
  );
}

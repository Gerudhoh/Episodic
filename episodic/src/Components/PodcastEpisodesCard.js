//Packages
import * as React from 'react';

//import {useLocation, withRouter} from 'react-router-dom';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  padding: 10,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function PodcastEpisode(props){
  return(
    <Stack direction="row">
      <img src={props.image} width="100px" height="auto" alt={`Cover image for ${props.title}`}/>
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
      {props.episodes.map((episode) =>
        <Item><PodcastEpisode
        image={props.image}
        title={episode.title}
        description={episode.description}/></Item>
      )}
    </Stack>
  );
}

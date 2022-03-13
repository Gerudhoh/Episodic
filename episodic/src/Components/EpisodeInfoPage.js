//Packages
import * as React from 'react';

//import {useLocation} from 'react-router-dom';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';


//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import PodcastEpisodesCard from './PodcastEpisodesCard.js';
import Reviews from './Reviews.js'



const episode = {
  title: 'episodeTitle',
  description: 'description',
  rating: 5,
  podcast: {
    title : 'podcastTitle',
    description : 'description',
    rss : 'rss',
    image : '/pepekingprawn.jpg',
    website : 'website',
    publisher : 'publisher',
    language : 'language',
    explicit : 'explicit',
    rating : 0,
    genre : 'genre',
    episodes : [
      {
        title: 'title1',
        description: 'description',
        podcast: 'podcast'
      },
      {
        title: 'title2',
        description: 'description',
        podcast: 'podcast'
      },
      {
        title: 'title3',
        description: 'description',
        podcast: 'podcast'
      },
    ],
    totalEpisodes : 'totalEpisodes',
    platforms : 'platforms',
    id : 'id',
  }
}

const Item = styled(Paper)(({ theme }) => ({
  padding: 10,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function EpisodeInfo(props){
  const episode = props.episode;
  const podcast = episode.podcast;

  return(
    <Stack direction="row" spacing={2} padding="10px" justifyContent="flex-start">
      <img src={podcast.image} width="200px" height="auto" alt={`Cover image for ${episode.title}`}/>
      <Item>
        <Stack alignItems="center" spacing={2} padding="10px">
          <Typography variant="h2">{episode.title}</Typography>
          <Typography variant="h3">{podcast.title}</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" style={{height: "35px"}}>Add To List</Button>
            <Button variant="contained" style={{height: "35px"}}>Review</Button>
          </Stack>
          <Rating readOnly size="large" value={episode.rating}/>
        </Stack>
      </Item>
      <Item>
        <Typography variant="p">{episode.description}</Typography>
      </Item>
    </Stack>
  );
}

export default function EpisodeInfoPage(){
  //const location = useLocation();
  return(
    <Stack spacing={2} sx={{pl:"20px", pt:"10px"}} justifyContent="space-evenly">
      <EpisodeInfo episode={episode}/>
      <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="left">
        <Item sx={{width:"45%"}}>
          <Typography variant="h3">More From {episode.podcast.title}</Typography>
          <PodcastEpisodesCard episodes={episode.podcast.episodes} image={episode.podcast.image} />
        </Item>
        <Item sx={{width:"45%"}}>
          <Typography variant="h3">Reviews</Typography>
          <Reviews />
        </Item>
      </Stack>
    </Stack>
  );
}

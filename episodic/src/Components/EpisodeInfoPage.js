//Packages
import * as React from 'react';

import { useState, useEffect } from 'react';
import {useLocation, Link} from 'react-router-dom';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import CircularProgress from '@mui/material/CircularProgress';


//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import PodcastEpisodesCard from './PodcastEpisodesCard.js';
import Reviews from './Reviews.js'

const Item = styled(Paper)(({ theme }) => ({
  padding: 10,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function EpisodeDetails(props){
  const episode = props.episode;
  const podcast = episode.podcast;
  const podURI =`/info/${encodeURIComponent(podcast.title)}`;
  return(
    <Stack direction="row" spacing={2} padding="10px" justifyContent="center">
      <img src={podcast.image} width="350px" alt={`Cover image for ${episode.title}`}/>
      <Item sx={{maxWidth:"55%"}}>
        <Stack alignItems="flex-start" spacing={2} padding="10px">
          <Typography textAlign="left" variant="h3">{episode.title}</Typography>
          <Typography variant="h4" component={Link} to={podURI} replace>{podcast.title}</Typography>
          <Rating readOnly size="large" value={episode.rating}/>
          <Typography component="div" textAlign="left" variant="p">{episode.description}</Typography>
        </Stack>
      </Item>
    </Stack>
  );
}

function EpisodeInfo(props){
  const episode = props.episode;
  return(
    <Stack spacing={2} padding="10px" justifyContent="center" alignItems="center">
      <Item sx={{width:"80%"}}><EpisodeDetails episode={episode}/></Item>
      <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="center">
        <Item sx={{width:"45%"}}>
          <Typography variant="h3">More From {episode.podcast.title}</Typography>
          <PodcastEpisodesCard episodes={episode.podcast.episodes.items} image={episode.podcast.image} podcastTitle={episode.podcast.title}/>
        </Item>
        <Item sx={{width:"45%"}} height="45vh">
          <Typography variant="h3">Reviews</Typography>
          <Box component="div" height="45vh" sx={{overflow:'auto', padding:'10px'}}>
            <Reviews />
          </Box>
        </Item>
      </Stack>
    </Stack>
  );
}

export default function EpisodeInfoPage(){
  const [value, setValue] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation()
  const podTitle = decodeURIComponent(location.pathname.split('/')[2]);
  const episodeTitle = decodeURIComponent(location.pathname.split('/')[3]);

  async function getEpisodeFromPodcast(podTitle, epTitle) {
    console.log(`Fetch ${epTitle} from ${podTitle}`);
    const response = await fetch('/api/v1/searchPodcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: podTitle }),
    });
    response.json().then(response => {
      let epPod = response.pod;
      let podEpisodes = response.eps;
      let episode = podEpisodes.items.find(ep => ep.title === epTitle);
      let info = {
        title : episode.title,
        description : episode.description,
        date: episode.datePublishedPretty,
        language : episode.feedLanguage,
        explicit : 'explicit',
        podcast: {
          title : epPod.title,
          description : epPod.description,
          rss : epPod.rss,
          image : epPod.image,
          website : epPod.url,
          publisher : epPod.author,
          language : epPod.language,
          explicit : 'explicit',
          genre : epPod.categories,
          episodes : podEpisodes,
        }
      }
      console.log(info)
      return <EpisodeInfo episode={info}/>
    }).then( resource => {
      setValue(resource);
      setLoading(false);

    });
  };

  useEffect(() => {
    getEpisodeFromPodcast(podTitle, episodeTitle);
  }, [podTitle]);

  return(
    <React.Fragment>
    {isLoading ? (
        <CircularProgress />
      ) : (
        value
      )}
    </React.Fragment>
  );
}

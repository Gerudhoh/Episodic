//Packages
import * as React from 'react';

import { useState, useEffect } from 'react';
import {useLocation, Link} from 'react-router-dom';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import CardMedia from "@mui/material/CardMedia";


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

class AddEpisodeToList extends React.Component{
  constructor(props) {
    super(props);
    this.episode = this.props.episode;
    this.image = this.props.image;

    this.state = {
      listView: this.props.listView || false,
      currentList: this.props.currentList || null,
      lists: [],
      listMenuItems: null,
      showSuccess: false
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  addEpisodeToList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/add/episode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.value], episode: this.episode, image: this.image}),
    });
    const body = await response.json();
    this.setState({ showSuccess: body.success });
    if (this.state.showSuccess) window.location.reload(false);

  };

  removeEpisode = async e =>  {
    return;
    const response = await fetch('/api/v1/lists/remove/podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.currentList, podcastId: this.id }),
    });
    const body = await response.json();
    this.setState({ showSuccess: body.success });
    if (this.state.showSuccess) window.location.reload(false);

  };

  getUserLists = async e => {
    //e.preventDefault();
    const response = await fetch("/api/v1/lists/get/all/names");
    const body = await response.json();
    let listNames = [];
    body.lists.map((list, index) =>
      listNames.push((<MenuItem key={index} value={index}>{list.name}</MenuItem>))
    );
    this.setState({ listMenuItems: listNames });
    this.setState({ lists: body.lists });
  };

  render() {
    return (
      <React.Fragment>
        <CardMedia component="audio" controls src={this.episode.audio} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Add to List</InputLabel>
            <Select variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={this.addEpisodeToList}
            >
              {this.state.listMenuItems}
            </Select>
          </FormControl>
      </React.Fragment>
    );
  }
};

function EpisodeDetails(props){
  const episode = props.episode;
  console.log(episode);
  const podcast = episode.podcast;
  const podURI =`/info/${encodeURIComponent(podcast.title)}`;
  return(
    <Stack direction="row" spacing={2} padding="10px" justifyContent="center">
      <img src={podcast.image} width="350px" alt={`Cover image for ${episode.title}`}/>
      <Item sx={{maxWidth:"55%"}}>
        <Stack alignItems="flex-start" spacing={2} padding="10px">
          <Typography textAlign="left" variant="h3">{episode.title}</Typography>
          <Typography variant="h4" component={Link} to={podURI} replace>{podcast.title}</Typography>
          
          <AddEpisodeToList episode={episode} image={podcast.image}/>
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
    const response = await fetch('/api/v1/get_episode_from_podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ podName: podTitle, epName: epTitle }),
    });
    response.json().then(response => {
      console.log(response);
      let epPod = response.pod;
      let podEpisodes = response.eps;
      let episode = response.episode;
      let info = {
        title : episode.title,
        description : episode.description,
        date: episode.datePublishedPretty,
        audio : episode.enclosureUrl,
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

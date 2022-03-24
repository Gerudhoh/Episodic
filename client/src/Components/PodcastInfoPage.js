//Packages
import * as React from 'react';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';


//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import PodcastEpisodesCard from './PodcastEpisodesCard.js';
import Reviews from './Reviews.js'

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

const Item = styled(Paper)(({ theme }) => ({
  padding: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

class AddPodcastToList extends React.Component{
  constructor(props) {
    super(props);
    this.podcast = this.props.podcast;
    this.img = this.props.podcast.image;
    this.id = this.props.id;
    this.podcastTitle = this.props.podcast.title;

    this.description = this.podcast.description;
    this.rss = this.podcast.rss;
    this.website = this.podcast.website;
    this.publisher = this.podcast.publisher;
    this.language = this.podcast.language;
    this.genre = this.podcast.genre;
    this.explicit = this.podcast.explicit;
    this.totalEpisodes = this.podcast.episodes?.count;
    this.platforms = this.podcast.platforms;
    this.isPodcast = true;
    this.uri = `/info/${encodeURIComponent(this.props.podcastTitle)}`;

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

  addPodcastToList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/add/podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.value], podcastId: this.id, description: this.description, title: this.podcastTitle, image: this.img,
        rss: this.rss,
        website: this.website,
        publisher: this.publisher,
        language: this.language,
        genre: this.genre,
        explicit: this.explicit,
        totalEpisodes: this.totalEpisodes }),
    });
    const body = await response.json();
    this.setState({ showSuccess: body.success });
    if (this.state.showSuccess) window.location.reload(false);

  };

  removePodcast = async e =>  {
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
    let response = await fetch('/api/v1/lists/get/all/names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.userId}),
    });
    let body = await response.json();
    if(body.noUser === true) {
      await delay(1000); //in case user is already logged in, wait for the auth
      let response = await fetch('/api/v1/lists/get/all/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.props.userId}),
      });
      body = await response.json();
    }
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
        {!this.state.listView && this.isPodcast ? (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Add to List</InputLabel>
            <Select variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={this.addPodcastToList}
            >
              {this.state.listMenuItems}
            </Select>
          </FormControl>
        ) : (null)}
        {this.state.listView && this.isPodcast ? (
          <FormControl>
          <Button variant="contained" onClick={this.removePodcast}>Remove</Button>
        </FormControl>
        ) : (null)}
      </React.Fragment>
    );
  }
};

function PodcastDetails(props){
  const podcast = props.podcast;
  return(
    <Stack direction="row" spacing={2} padding="10px" justifyContent="flex-start">
      <img src={podcast.image} alt={podcast.image} width="350px" height="auto"/>
      <Item>
        <Stack alignItems="center" spacing={2} padding="10px">
          <Typography variant="h2" ><Link href={podcast.website} target="_blank" rel="noreferrer" sx={{color:'primary.contrastText'}}>{podcast.title}</Link></Typography>
          <AddPodcastToList podcast={podcast} userId={props.userId}/>
          <Rating readOnly size="large" value={podcast.rating}/>
        </Stack>
      </Item>
      <Item sx={{maxWidth:"40%"}}>
        <Typography component="div" variant="p" textAlign="left">{podcast.description}</Typography>
      </Item>
    </Stack>
  );
}

function PodcastInfo(props){
  const podcast = props.podcast;
  return(
    <Stack spacing={2} padding="10px" justifyContent="center">
      <Item><PodcastDetails podcast={podcast} userId={props.userId} /></Item>
      <Stack direction="row" padding="10px" spacing={2} justifyContent="center">
        <Item sx={{maxWidth:"45%"}}>
          <Typography variant="h3" textAlign="left">Episodes</Typography>
          <PodcastEpisodesCard episodes={podcast.episodes.items} image={podcast.image} podcastTitle={podcast.title} userId={props.userId}/>
        </Item>
        <Item >
          <Typography variant="h3" textAlign="left">Reviews</Typography>
          <Box component="div" height="45vh" sx={{overflow:'auto', padding:'10px'}}>
            <Reviews />
          </Box>
        </Item>
      </Stack>
    </Stack>
  );
}


export default function PodcastInfoPage(props){
  const [value, setValue] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation()
  const podTitle = decodeURIComponent(location.pathname.split('/')[2]);

  async function getPodcast(data, userId) {
    const response = await fetch('/api/v1/searchPodcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: data }),
    });
    response.json().then(response => {
      let podcast = response.pod;
      let episodes = response.eps;
      let info = {
        title : podcast.title,
        description : podcast.description,
        rss : podcast.url,
        image : podcast.image,
        website : podcast.link,
        publisher : podcast.author,
        language : podcast.language,
        explicit : false,
        genre : podcast.categories,
        episodes : episodes,
      }
      return <PodcastInfo podcast={info} userId={userId}/>
    }).then( resource => {
      setValue(resource);
      setLoading(false);

    });
  }

  useEffect(() => {
    getPodcast(podTitle, props.userId);
  }, [podTitle, props.userId]);

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

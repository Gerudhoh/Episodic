//Packages
import * as React from 'react';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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

const podcast1 = {
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

const reviews = [
    {
      name: "name1",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },

    {
      name: "name2",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
    {
      name: "name3",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
    {
      name: "name4",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
]


const Item = styled(Paper)(({ theme }) => ({
  padding: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

class AddPodcastToList extends React.Component{
  constructor(props) {
    super(props);
    this.podcast = this.props.podcast;
    this.img = this.props.img;
    this.id = this.props.id;
    this.podcastTitle = this.props.podcastTitle;

    this.description = this.podcast.description;
    this.rss = this.podcast.rss;
    this.website = this.podcast.website;
    this.publisher = this.podcast.publisher;
    this.language = this.podcast.language;
    this.genre = this.podcast.genre;
    this.explicit = this.podcast.explicit;
    this.totalEpisodes = this.podcast.totalEpisodes;
    this.platforms = this.podcast.platforms;
    this.audioLengthSeconds = this.podcast.audioLengthSeconds;
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
    const response = await fetch("/api/v1/lists/get/all");
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
      <img src={podcast.image} width="300px" height="auto"/>
      <Item>
        <Stack alignItems="center" spacing={2} padding="10px">
          <Typography variant="h2">{podcast.title}</Typography>
          <AddPodcastToList podcast={podcast}/>
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
      <Item><PodcastDetails podcast={podcast} /></Item>
      <Stack direction="row" padding="10px" spacing={2} justifyContent="center">
        <Item sx={{maxWidth:"45%"}}>
          <Typography variant="h3" textAlign="left">Episodes</Typography>
          <PodcastEpisodesCard episodes={podcast.episodes.items} image={podcast.image}/>
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


export default function PodcastInfoPage(){
  const [value, setValue] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation()
  const podTitle = decodeURIComponent(location.pathname.split('/')[2]);

  async function getPodcast(data) {
    console.log("Fetch " + data);
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
        rss : podcast.rss,
        image : podcast.image,
        website : podcast.url,
        publisher : podcast.author,
        language : podcast.language,
        explicit : 'explicit',
        genre : podcast.categories,
        episodes : episodes,
      }
      console.log(info);
      return <PodcastInfo podcast={info}/>
    }).then( resource => {
      setValue(resource);
      setLoading(false);

    });
  }

  useEffect(() => {
    getPodcast(podTitle);
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

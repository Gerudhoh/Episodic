//Packages
import * as React from 'react';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

//Material UI Components
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
  padding: 10,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function PodcastInfo(props){
  const podcast = props.podcast;
  return(
    <Stack direction="row" spacing={2} padding="10px" justifyContent="flex-start">
      <img src={podcast.image} width="200px" height="auto"/>
      <Item>
        <Stack alignItems="center" spacing={2} padding="10px">
          <Typography variant="h2">{podcast.title}</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" style={{height: "35px"}}>Add To List</Button>
            <Button variant="contained" style={{height: "35px"}}>Review</Button>
          </Stack>
          <Rating readOnly size="large" value={podcast.rating}/>
        </Stack>
      </Item>
      <Item>
        <Typography variant="p">{podcast.description}</Typography>
      </Item>
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
        rss : podcast.url,
        image : podcast.image,
        website : podcast.link,
        publisher : podcast.author,
        language : podcast.language,
        explicit : 'explicit',
        genre : podcast.categories,
        episodes : episodes,
      }
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

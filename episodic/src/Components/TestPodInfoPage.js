import * as React from 'react';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

//Material UI Components
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';
 import CircularProgress from '@mui/material/CircularProgress';

//Material UI Icons and Styling
// import { styled } from '@mui/material/styles';
//
// //Custom Components
// import PodcastEpisodesCard from './PodcastEpisodesCard.js';
// import Reviews from './Reviews.js'
import PodcastInfo from './PodcastInfoPage.js';

export default function TestPodInfo(){
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

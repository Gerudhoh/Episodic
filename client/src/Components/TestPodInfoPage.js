import * as React from 'react';
// import { useState, useEffect } from 'react';

//Material UI Components
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';
// import CircularProgress from '@mui/material/CircularProgress';

//Material UI Icons and Styling
// import { styled } from '@mui/material/styles';
//
// //Custom Components
// import PodcastEpisodesCard from './PodcastEpisodesCard.js';
// import Reviews from './Reviews.js'

export default function TestPodInfo(){
  //const location = useLocation()
  const podTitle = decodeURIComponent(window.location.pathname.split('/')[2]);

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
      //let podInfo = {title: 'testTitle'};
      console.log(data);
      //   title : data.title,
      //   description : data.description,
      //   rss : data.rss,
      //   image : data.data.image,
      //   website : data.data.website,
      //   publisher : data.data.publisher,
      //   language : data.data.language,
      //   explicit : 'explicit',
      //   genre : data.data.genre_ids,
      //   episodes : data.data.episodes,
      // // }
      // console.log(podInfo);
      return('huh');
    });
  }

  getPodcast(podTitle);

  return(
    <Typography>Displaying something</Typography>
  );
}

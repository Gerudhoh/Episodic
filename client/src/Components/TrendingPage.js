import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

//Custom Components
import EpisodeCardList from "./EpisodeCardList.js"

function searchPageStack(){
  return(
    <React.Fragment>
    <Stack alignItems="flex-start" justifyContent="space-evenly" direction="row" spacing={2}>
      <Stack spacing={2}>
      </Stack>
    </Stack>
    </React.Fragment>
  );
}

function searchPageNormal(){
  return(

    <Stack flexWrap="wrap" direction="row" spacing={2} columnSpacing={2} alignItems="flex-start" justifyContent="center" padding="10px">
      <Stack sx={{maxWidth:"25%"}} spacing={2}>
      </Stack>
    </Stack>
  );
}

export default function SearchPage(){
  const [value, setValue] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation()
  async function fetchData(data) {
    setLoading(true);
    const response = await fetch('/api/v1/trending', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response.json().then(data => {
      let images = [];
      let length = data.data.length;
      console.log(length);
      for(let i = 0; i < length; i++) {
        console.log(data.data[i]);
        images.push({
          img: data.data[i].image,
          podcastTitle: data.data[i].title,
          id: data.data[i].id,
          description: data.data[i].description,
          rss: "Unknown",
          website: data.data[i].url,
          publisher: data.data[i].author,
          language: data.data[i].language,
          genre: data.data[i].categories,
          explicit: "Unknown",
          totalEpisodes: "Unknown"
        });
      }

      return(
        <Stack spacing={2} padding="20px">
          <Typography variant="h4">Trending Podcasts</Typography>
          <EpisodeCardList images={images} listSize={"large"}/>
        </Stack>
        );
    }).then( resource => {
      setValue(resource);
      setLoading(false);

    });

  };

  useEffect(() => {
    fetchData(location.state)
  }, [location.state]);

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

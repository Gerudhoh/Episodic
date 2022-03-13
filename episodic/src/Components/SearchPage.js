import * as React from 'react';
import { useState, useEffect } from 'react';
import MediaQuery  from 'react-responsive';
import { useLocation } from 'react-router-dom'

//Material UI Components
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';


//Custom Components
import AllLists from "./AllLists.js";
import NavBar from "./NavBar.js";
import ListPreview from "./ListPreview.js"
import EpisodeCardList from "./EpisodeCardList.js"

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    console.log("Fetch " + data);
    const response = await fetch('/api/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: data }),
    });
    response.json().then(data => {
      let images = [];
      let length = data.data.length;
      console.log(length);
      for(let i = 0; i < length; i++) {
        images.push({
          img: data.data[i].image,
          podcastTitle: data.data[i].title_original,
          episodeTitle: ""
        });
      }

      console.log(images);
      return(
        <Stack spacing={2} padding="20px">
          <Typography variant="h4">Search Results</Typography>
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
  }, []);

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

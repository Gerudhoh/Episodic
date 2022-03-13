import React, { useState, useEffect } from 'react';
import MediaQuery  from 'react-responsive';
import { useLocation } from 'react-router-dom'

//Material UI Components
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';


//Custom Components
import AllLists from "./AllLists.js";
import NavBar from "./NavBar.js";
import ListPreview from "./ListPreview.js"

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
        <AllLists />
      </Stack>
    </Stack>
    </React.Fragment>
  );
}

function searchPageNormal(){
  return(

    <Stack flexWrap="wrap" direction="row" spacing={2} columnSpacing={2} alignItems="flex-start" justifyContent="center" padding="10px">
      <Stack sx={{maxWidth:"25%"}} spacing={2}>
        <Item ><AllLists /></Item>
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
      for(let i = 0; i < length; i++) {
        images.push({
          img: data.data[i].image,
          title: data.data[i].title,
          id: data.data[i].id
        });
      }
  
      return(
        <Stack spacing={2}>
          <ListPreview listName={"Search Results"} images={images} listSize={"large"}/>
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
    <NavBar />
    {isLoading ? (
        <CircularProgress />
      ) : (
        value
      )}
    </React.Fragment>
  );
}

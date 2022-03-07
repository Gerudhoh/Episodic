import * as React from 'react';
import MediaQuery  from 'react-responsive';

//Material UI Components
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';


//Material UI Icons and Styling
import { styled } from '@mui/material/styles';


//Custom Components
import AllLists from "./AllLists.js";
import NavBar from "./NavBar.js";

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

export default function SearchPage(route){
  const { searchResults } = route.params;
  return(
    <React.Fragment>
    <NavBar />
      <MediaQuery query='(min-width: 1225px)'>
        {searchPageNormal()}
      </MediaQuery>
      <MediaQuery query='(max-width: 1224px)'>
        {searchPageStack()}
      </MediaQuery>
    </React.Fragment>
  );
}

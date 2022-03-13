import * as React from 'react';
import MediaQuery  from 'react-responsive';

//Material UI Components
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';


//Material UI Icons and Styling
import { styled } from '@mui/material/styles';


//Custom Components
import ListsHighlight from "./ListsHighlight.js";
import FriendActivity from "./FriendActivity.js";
import AllLists from "./AllLists.js";
import NavBar from "./NavBar.js";

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function homePageStack(){
  return(
    <React.Fragment>
    <Stack alignItems="flex-start" justifyContent="space-evenly" direction="row" spacing={2}>
      <ListsHighlight listSize="large"/>
      <Stack spacing={2}>
        <FriendActivity activitySize="small" />
        <FriendActivity activitySize="small" />
        <AllLists />
      </Stack>
    </Stack>
    </React.Fragment>
  );
}

function homePageNormal(){
  return(

    <Stack flexWrap="wrap" direction="row" spacing={2} columnSpacing={2} alignItems="flex-start" justifyContent="center" padding="10px">
      <Stack sx={{maxWidth:"25%"}} spacing={2}>
        <Item ><FriendActivity activitySize="large" /></Item>
        <Item ><AllLists /></Item>
      </Stack>
      <Item sx={{maxWidth:"50%"}}><ListsHighlight listSize="large"/></Item>
      <Item sx={{maxWidth:"25%"}}><FriendActivity activitySize="large" /></Item>
    </Stack>
  );
}

export default function HomePage(){

  return(
    <React.Fragment>
      <NavBar />
      <MediaQuery query='(min-width: 1225px)'>
        {homePageNormal()}
      </MediaQuery>
      <MediaQuery query='(max-width: 1224px)'>
        {homePageStack()}
      </MediaQuery>
    </React.Fragment>
  );
}

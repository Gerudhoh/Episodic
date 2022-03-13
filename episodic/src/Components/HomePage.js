import * as React from 'react';
import MediaQuery  from 'react-responsive';

//Material UI Components
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import ListsHighlight from "./ListsHighlight.js";
import FriendActivity from "./FriendActivity.js";
import AllLists from "./AllLists.js";
import NavBar from "./NavBar.js";

import AllComponents from "./AllComponents.js";

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
}));


function homePageStack(){
  return(
    <React.Fragment>
    <Stack alignItems="flex-start" justifyContent="space-evenly" direction="row" spacing={2} sx={{padding:"20px"}}>
        <Item sx={{maxWidth:"60%"}}>
          <Typography variant="h4">Explore</Typography>
          <ListsHighlight listSize="small"/>
        </Item>
        <Item sx={{maxWidth:"40%"}}><FriendActivity activitySize="small" /></Item>
    </Stack>
    </React.Fragment>
  );
}

function homePageNormal(){
  return(

    <Stack flexWrap="wrap" direction="row" spacing={2} columnspacing={2} alignItems="flex-start" justifyContent="center" padding="10px">
      <Stack sx={{maxWidth:"25%"}} spacing={2}>
        <Item ><AllLists /></Item>
        <Item>
          <Typography variant="h4">My Activity</Typography>
          <FriendActivity activitySize="large" />
        </Item>
      </Stack>
      <Item sx={{maxWidth:"50%"}}>
        <Typography variant="h4">Explore</Typography>
        <ListsHighlight listSize="large"/>
      </Item>
      <Item sx={{maxWidth:"25%"}}>
        <Typography variant="h4">Friend Activity</Typography>
        <FriendActivity activitySize="large" />
      </Item>
    </Stack>
  );
}

export default function HomePage(){

  return(
    <React.Fragment>
      <MediaQuery query='(min-width: 1225px)'>
        {homePageNormal()}
      </MediaQuery>
      <MediaQuery query='(max-width: 1224px)'>
        {homePageStack()}
      </MediaQuery>
    </React.Fragment>
  );
}

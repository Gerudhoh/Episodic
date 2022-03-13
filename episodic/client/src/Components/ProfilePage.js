import * as React from 'react';

//Material UI Components
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

//Material UI styling/Icons
import { styled } from '@mui/material/styles';

//Custom Components
import ListsHighlight from "./ListsHighlight.js";
import FriendActivity from "./FriendActivity.js";
import AllLists from "./AllLists.js";
import EpisodeCard from "./EpisodeCard.js";
import UserInfo from "./UserInfo.js";
import FollowingList from "./FollowingList.js";
import FriendList from "./FriendList.js";
import UserReviews from "./UserReviews.js"

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserDescriptionStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center"
}

const userInfo={
  name: "userName",
  profilePic: "/pepekingprawn.jpg",
  numPodsListened: 23,
  numEpisListened: 187,
  numLists: 12,
  numReviews: 77,
  ratingAvg: 3.96
}

const flag = "ownProfile";

//Inner Components
function UserProfileButton(props){
  if(flag === "ownProfile"){
    return(<Button variant="contained" style={{height: "35px"}}>Edit</Button>);
  }
  else {
    return(<Button variant="contained" style={{height: "35px"}}>Follow</Button>);
  }
}


function UserDescription(props){
  return(
    <React.Fragment>
    <Box sx={{display:"flex", flexDirection:"columns"}}>
      <Avatar sx={{width: 80, height: 80}} alt={props.userName} src={props.profilePic}/>
      <Box sx={{display:"flex", flexDirection:"column", spacing:2, padding: 2, justifyContent:"flex-start"}}>
        <Typography> {props.userName} </Typography>
        <Box sx={{display:"flex", flexDirection:"row"}} spacing={12}>
          <Box sx={{padding: 0.5}}><Typography> {props.numPodsListened} Podcasts </Typography></Box>
          <Box sx={{padding: 0.5}}><Typography> {props.numEpisListened} Episodes </Typography></Box>
          <Box sx={{padding: 0.5}}><Typography> {props.numLists} Lists </Typography></Box>
        </Box>
        <Typography>{props.numReviews} Reviews ({props.ratingAvg} average)</Typography>
      </Box>
      <UserProfileButton />
    </Box>
    </React.Fragment>
  );
}

function FollowingRow(){
  return (
    <React.Fragment>
      <Grid item lg={6}>
        <Item><FriendList /></Item>
      </Grid>
      <Grid item lg={6}>
        <Item><FollowingList /></Item>
      </Grid>
    </React.Fragment>
  );
}

export default function ProfilePage(){
  return (
      <Grid container display="flex" spacing={2} justifyContent="center" alignItems="flex-start">
        <Grid container style={UserDescriptionStyle} item lg={3} spacing={2} >
          <Grid item lg={12} >
              <Item> <UserDescription
              userName={userInfo.name}
              profilePic={userInfo.profilePic}
              numPodsListened={userInfo.numPodsListened}
              numEpisListened={userInfo.numEpisListened}
              numLists={userInfo.numLists}
              numReviews={userInfo.numReviews}
              ratingAvg={userInfo.ratingAvg}
              /> </Item>
          </Grid>
          <Grid container item lg={12} spacing={2}>
            <FollowingRow />
          </Grid>
        </Grid>
        <Grid item lg={4}>
          <Item> <UserReviews /> </Item>
        </Grid>
        <Grid item lg={4}>
          <Item> <ListsHighlight listSize="small"/> </Item>
        </Grid>
      </Grid>
    );
}

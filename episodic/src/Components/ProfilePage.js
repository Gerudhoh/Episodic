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
import UserInfo from "./UserInfo.js";
import UserReviews from "./UserReviews.js"
import Achievement from "./Achievement.js"

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const userInfo={
  name: "userName",
  profilePic: "/pepekingprawn.jpg",
  numPodsListened: 23,
  numEpisListened: 187,
  numLists: 12,
  numReviews: 77,
  ratingAvg: 3.96
}

const following = [
    {
      name: "name1",
      activityType: "newList"
    },

    {
      name: "name2",
      activityType: "newList"
    },
    {
      name: "name3",
      activityType: "newList"
    },
    {
      name: "name4",
      activityType: "listMove"
    },
];

const friends = [
    {
      name: "name1",
      activityType: "newList"
    },

    {
      name: "name2",
      activityType: "newList"
    },
    {
      name: "name3",
      activityType: "newList"
    },
    {
      name: "name4",
      activityType: "listMove"
    },
];

const achievements = ['critic', 'socialbutterfly', 'organizer', 'closer'];

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

function FriendList(props) {
  return (
    <Box container>
      <Typography>Friends</Typography>
      <Stack spacing={2}>
      {friends.map((item) => (
        <UserInfo userName={item.name} avatarSize={props.userSize} fontSize={props.fontSize}/>
      ))}
      </Stack>
    </Box>
  );
}

function FollowingList(props) {
  return (
    <Box container>
      <Typography>Following</Typography>
      <Stack spacing={2}>
      {following.map((item) => (
        <UserInfo userName={item.name} avatarSize={props.userSize} fontSize={props.fontSize}/>
      ))}
      </Stack>
    </Box>
  );
};

function UserDescription(props){

  return(
    <Stack direction="row" spacing={2} justifyContent="flex-start">
      <Avatar sx={{width: 80, height: 80}} alt={props.userName} src={props.profilePic}/>
      <Stack justifyContent="flex-start" alignItems="flex-start">
        <Typography> {props.userName} </Typography>
        <Stack direction="row" spacing={1} justifyContent="space-evenly">
          <Typography>{props.numPodsListened} Podcasts </Typography>
          <Typography>{props.numEpisListened} Episodes </Typography>
          <Typography>{props.numLists} Lists </Typography>
        </Stack>
        <Typography>{props.numReviews} Reviews ({props.ratingAvg} average)</Typography>
      </Stack>
      <UserProfileButton />
    </Stack>
  );
}

function Achievements(){
  return(
    <React.Fragment>
      <Typography>Achievements</Typography>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-evenly">
        <Stack spacing={2} alignItems="flex-start">
          <Achievement achievement={achievements[0]} />
          <Achievement achievement={achievements[1]} />
        </Stack>
        <Stack spacing={2} alignItems="flex-start">
          <Achievement achievement={achievements[2]} />
          <Achievement achievement={achievements[3]} />
        </Stack>
      </Stack>
    </React.Fragment>
  )
}

function profileNormal(){
  return(
    <Stack flexWrap="wrap" direction="row" spacing={2} padding="20px" alignItems="flex-start" justifyContent="space-evenly">
      <Stack spacing={2}>
        <Item><UserDescription
        userName={userInfo.name}
        profilePic={userInfo.profilePic}
        numPodsListened={userInfo.numPodsListened}
        numEpisListened={userInfo.numEpisListened}
        numLists={userInfo.numLists}
        numReviews={userInfo.numReviews}
        ratingAvg={userInfo.ratingAvg}
        /></Item>
        <Item>{Achievements()}</Item>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Item sx={{width:"50%"}}><FollowingList userSize="small" fontSize={20}/></Item>
          <Item sx={{width:"50%"}}><FriendList userSize="small" fontSize={20}/></Item>
        </Stack>
      </Stack>
      <Item sx={{maxWidth:"35%"}}><UserReviews /></Item>
      <ListsHighlight listSize="medium"/>
    </Stack>
  );
}

export default function ProfilePage(){
  return (
    profileNormal()
    );
}

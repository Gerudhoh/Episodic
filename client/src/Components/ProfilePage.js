import * as React from 'react';
import MediaQuery  from 'react-responsive';
import {Link, useLocation} from 'react-router-dom';
//Material UI Components
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
import Achievement from "./Achievement.js"
import FriendList from "./FriendList";
import EditProfile from "./EditProfilePage.js";
import MyFriendList from "./MyFriendList";
import Reviews from "./ReviewsUser.js"

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const userInfo={
  name: null,
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

const achievements = ['critic', 'socialbutterfly', 'organizer', 'closer'];

const flag = "ownProfile";

//Inner Components
function UserProfileButton(props){
  if(flag === "ownProfile"){
    return(<Button variant="contained" component={Link} to="/editprofile" props={props} style={{height: "35px"}}>Edit</Button>);
  }
  else {
    return(<Button variant="contained" style={{height: "35px"}}>Follow</Button>);
  }
}

function UserDescription(props){

  // I don't want to delete this old code, but I am actually too lazy to do the stats stuff atm, maybe we can do this later but it's not in our TDD sooooo
  /*return(
    <Stack direction="row" spacing={2} justifyContent="flex-start">
      <Avatar sx={{width: 80, height: 80}} alt={props.userName} src={props.profilePic}/>
      <Stack justifyContent="flex-start" alignItems="flex-start">
        <Typography variant="h6" > {props.userName} </Typography>
        <Stack direction="row" spacing={1} justifyContent="space-evenly">
          <Typography variant="p" textAlign="left">{props.numPodsListened} Podcasts </Typography>
          <Typography variant="p" textAlign="left">{props.numEpisListened} Episodes </Typography>
          <Typography variant="p" textAlign="left">{props.numLists} Lists </Typography>
        </Stack>
        <Typography variant="p" textAlign="left">{props.numReviews} Reviews ({props.ratingAvg} average)</Typography>
      </Stack>
      <UserProfileButton />
    </Stack>
  );*/

  return(
    <Stack direction="row" spacing={2} justifyContent="flex-start">
      <Avatar sx={{width: 80, height: 80}} alt={props.userName} src={props.profilePic}/>
      <Stack justifyContent="flex-start" alignItems="flex-start">
        <Typography variant="h6" > {props.userName} </Typography>
      </Stack>
      <UserProfileButton props={props} />
    </Stack>
  );
}

function Achievements(){
  return(
    <React.Fragment>
      <Typography variant="h5">Achievements</Typography>
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

function profileNormal(props){
  return(
    <Stack direction="row" spacing={2} padding="10px" alignItems="flex-start" justifyContent="space-evenly">
      <Stack spacing={2} sx={{maxWidth:"30%"}}>
        <Item ><UserDescription
        userName={userInfo.name}
        userId={props.userId}
        userEmail={props.email}
        profilePic={userInfo.profilePic}
        numPodsListened={userInfo.numPodsListened}
        numEpisListened={userInfo.numEpisListened}
        numLists={userInfo.numLists}
        numReviews={userInfo.numReviews}
        ratingAvg={userInfo.ratingAvg}
        /></Item>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Item sx={{width:"50%"}}>
          <MyFriendList activitySize="small" userId={props.userId} updateUserFriends={props.updateUserFriends} allFriends={props.allFriends}/>
        </Item>
        </Stack>
      </Stack>
      <Item sx={{maxWidth:"30%"}}>
        <Typography variant="h4">Reviews</Typography>
        <Reviews userId={props.userId}/>
      </Item>
      <Item sx={{maxWidth:"40%"}}>
        <Typography variant="h4" component={Link} to="/listview/all">Lists</Typography>
        <ListsHighlight listSize="medium" userId={props.userId}/>
      </Item>
    </Stack>
  );
};

function profileStack(props){
  return(
    <Stack direction="row" spacing={2} padding="10px" alignItems="flex-start" justifyContent="center">
      <Stack spacing={2} sx={{maxWidth:"50%"}}>
        <Item ><UserDescription
        userName={userInfo.name}
        userId={props.userId}
        userEmail={props.email}
        profilePic={userInfo.profilePic}
        numPodsListened={userInfo.numPodsListened}
        numEpisListened={userInfo.numEpisListened}
        numLists={userInfo.numLists}
        numReviews={userInfo.numReviews}
        ratingAvg={userInfo.ratingAvg}
        /></Item>
        <Stack direction="row" spacing={2} justifyContent="center">
          <MyFriendList activitySize="small" userId={props.userId} updateUserFriends={props.updateUserFriends} allFriends={props.allFriends}/>
        </Stack>
        <Item sx={{maxWidth:"100%"}}><ListsHighlight listSize="small"/></Item>
      </Stack>
      <Item sx={{maxWidth:"40%"}}>
        <Typography variant="h4">Reviews</Typography>
        <Reviews />
      </Item>

    </Stack>
  );
};

export default function ProfilePage(props){
  const location = useLocation();
  userInfo.name = location.state
    ? location.state.username 
    : props.username;
  return (
    <React.Fragment>
        {props.auth === true &&
        <div>
          <MediaQuery query='(min-width: 1225px)'>
            {profileNormal(props)}
          </MediaQuery>
          <MediaQuery query='(max-width: 1224px)'>
            {profileStack(props)}
          </MediaQuery>
        </div>
      }

      {props.auth === false &&
        <div>
          <Typography variant="h4">Please Login or Sign Up</Typography>
          <Button><Link to="/login">Login</Link></Button>
          <Button><Link to="/signup">Sign Up</Link></Button>
        </div>
      }
      </React.Fragment>
    );
}

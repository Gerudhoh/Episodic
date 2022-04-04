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
import MyFriendList from "./MyFriendList.js";
import FriendActivityList from "./FriendActivityList.js";
import MyActivity from "./MyActivity.js";
import AllLists from "./AllLists.js";

//import AllComponents from "./AllComponents.js";

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: 10,
  textAlign: 'center',
}));


function homePageStack(props){
  return(
    <React.Fragment>
    <Stack alignItems="flex-start" justifyContent="center" direction="row" spacing={1} sx={{padding:"10px"}}>
        <Item sx={{maxWidth:"60%"}}>
          <Typography variant="h4">Explore</Typography>
          <ListsHighlight listSize="small" userId={props.userId}/>
        </Item>
        {props.userId &&
          <Stack sx={{maxWidth:"30%"}} spacing={2}>
          <Item>
            <Typography variant="h4">My Friends</Typography>
            <MyFriendList activitySize="small" userId={props.userId} updateUserFriends={props.updateUserFriends} allFriends={props.allFriends}/>
          </Item>
          <Item>
            <Typography variant="h4">Friend Activity</Typography>
            <FriendActivityList activitySize="small" userSize="small" fontSize={20} friendActivity={props.friendActivity}/>
          </Item>
          </Stack>
        }
    </Stack>
    </React.Fragment>
  );
}

function homePageNormal(props){
  console.log(props)
  return(

    <Stack direction="row" spacing={1} alignItems="flex-start" justifyContent="center" padding="10px">
      <Stack sx={{maxWidth:"30%"}} spacing={2}>
        <Item><AllLists userId={props.userId} /></Item>
        <Item >
          <Typography variant="h4">My Activity</Typography>
          <MyActivity activitySize="small" userId={props.userId} myActivity={props.myActivity} updateUserActivity={props.updateUserActivity} />
        </Item>
      </Stack>
      <Item sx={{maxWidth:"40%"}}>
        <Typography variant="h4">Explore</Typography>
        <ListsHighlight listSize="medium" userId={props.userId}/>
      </Item>
      {props.userId &&
        <Stack sx={{maxWidth:"30%"}} spacing={2}>
          <Item>
            <Typography variant="h4">My Friends</Typography>
            <MyFriendList activitySize="small" userId={props.userId} updateUserFriends={props.updateUserFriends} allFriends={props.allFriends}/>
          </Item>
          <Item>
          <Typography variant="h4">Friend Activity</Typography>
            <FriendActivityList activitySize="small" userSize="small" fontSize={20} friendActivity={props.friendActivity}/>
          </Item>
          </Stack>
        }

    </Stack>
  );
}

export default function HomePage(props){

  return(
    <React.Fragment>
      <MediaQuery query='(min-width: 1225px)'>
        {homePageNormal(props)}
      </MediaQuery>
      <MediaQuery query='(max-width: 1224px)'>
        {homePageStack(props)}
      </MediaQuery>
    </React.Fragment>
  );
}

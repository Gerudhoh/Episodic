import * as React from 'react';
import {useLocation} from 'react-router-dom';
//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';


//import Button from '@mui/material/Button';


import UserInfo from './UserInfo.js';
import AllLists from './AllLists.js';
import EpisodeCardList from './EpisodeCardList.js';
import SingleListView from './SingleListView.js';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


// function NewListButton(props){
//   if(flag === "ownProfile"){
//     return(<Button variant="contained" style={{height: "35px", width:"auto"}}>New List</Button>);
//   }
//   else {
//     return(<React.Fragment></React.Fragment>);
//   }
// }


class ProfileListViewClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: "",
      list: {},
      allLists: [],
      showSuccess: JSON.parse(localStorage.getItem('showSuccess')) || false,
      showError: false
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  getUserLists = async e => {
    //e.preventDefault();
    let response = await fetch('/api/v1/lists/get/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.userId}),
    });
    const body = await response.json();
    //const listMap = body.lists.map((list) => {list.name});
    let userLists = [];


    body.lists.forEach((list) => {
      let listImgs = [];
      list.episodes.map((episode) => listImgs.push({img: episode.podcast.image, episodeTitle: episode.title, podcastTitle:episode.podcast.title}));
      list.podcasts.map((podcast) => listImgs.push({img: podcast.image, episodeTitle: "", podcastTitle: podcast.title}))
      userLists.push({ name: list.name, images:[listImgs]});
    });

    this.setState({ allLists: userLists });

  };

  EditListButtons(){
    const flag = "ownProfile";
    if(flag === "ownProfile"){
      return(
        <Fab size="small">
          <EditIcon fontSize="small"/>
        </Fab>
      );
    }
    else {
      return(<React.Fragment></React.Fragment>);
    }

  };

  ShowList(listName){
    if(listName === 'all'){
      return (<React.Fragment></React.Fragment>);
    }
    const list = this.state.allLists.find((list) => list.name === listName);
    if(list){
      return(
        <Item>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h4">{list.name}</Typography>
          </Stack>
          <Stack>
            <SingleListView location={this.props.location} listSize={"large"} userId={this.props.userId} />
          </Stack>
        </Stack>
      </Item>
      );
    }
    return (<React.Fragment></React.Fragment>);

  };

  render(){
    return(
      <Stack direction="row" spacing={2} padding="20px">
        <Stack spacing={2} sx={{width:"25%"}}>
          <Item >
            <Stack spacing={2} direction="row" justifyContent="space-between" >
              <UserInfo avatarSize="large" fontSize="20px" userName={this.props.userName} />
            </Stack>
          </Item>
          <Item><AllLists userId={this.props.userId} /></Item>
        </Stack>
        {  this.ShowList(this.props.location.split('/')[2])}
      </Stack>
    )
    };
}

export default function ProfileListView(props){
  const location = useLocation();
  return(
    <Stack spacing={1} alignItems="flex-start" justifyContent="center" padding="10px">
        <Item sx={{maxWidth:"40%"}}>
          <AllLists userId={props.userId} />
        </Item>
        <Item sx={{maxWidth:"60%"}}>
          <ProfileListViewClass location={location.pathname} userId={props.userId} userName={props.username}/>
       </Item>
    </Stack>
  );
}

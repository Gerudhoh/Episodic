import * as React from 'react';

//Material UI Components
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';


//Custom Components
import ListsHighlight from "./ListsHighlight.js";
import FriendActivity from "./FriendActivity.js";
import AllLists from "./AllLists.js";
import EpisodeCard from "./EpisodeCard.js";
import UserInfo from "./UserInfo.js";

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const homePageGridStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
}



class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listName: "",
      list: {},
      listId: 0,
      lists: [],
      formattedLists: ""
    };
  }

  handleStateChange = async(e) => {
    await this.setState({ [e.target.id]: e.target.value });
  }

  componentDidMount() {
    this.getUserLists();
  }

  createList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.listName }),
    });
    const body = await response.json();
    this.setState({ list: body.list }); 
    await this.getUserLists();
  };

  addPodcastToList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/add/podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.id] }),
    });
    const body = await response.json();
    let tempLists = this.state.lists;
    tempLists[e.target.id] = body.list;
    this.setState({ lists: tempLists });  
    const listMap = tempLists.map((list) =>  <li>{JSON.stringify(list)}</li>);
    this.setState({formattedLists: listMap})
  };

  removePodcastFromList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/remove/podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.id] }),
    });
    const body = await response.json();
    let tempLists = this.state.lists;
    tempLists[e.target.id] = body.list;
    this.setState({ lists: tempLists });  
    const listMap = tempLists.map((list) =>  <li>{JSON.stringify(list)}</li>);
    this.setState({formattedLists: listMap})
  };

  addEpisodeToList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/add/episode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.id] }),
    });
    const body = await response.json();
    let tempLists = this.state.lists;
    tempLists[e.target.id] = body.list;
    this.setState({ lists: tempLists });  
    const listMap = tempLists.map((list) =>  <li>{JSON.stringify(list)}</li>);
    this.setState({formattedLists: listMap})
  };

  removeEpisodeFromList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/remove/episode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.id] }),
    });
    const body = await response.json();
    let tempLists = this.state.lists;
    tempLists[e.target.id] = body.list;
    this.setState({ lists: tempLists });  
    const listMap = tempLists.map((list) =>  <li>{JSON.stringify(list)}</li>);
    this.setState({formattedLists: listMap})
  };

  getUserLists = async e => {
    //e.preventDefault();
    const response = await fetch("/api/v1/lists/get/all");
    const body = await response.json();
    const listMap = body.lists.map((list) =>  <li>{JSON.stringify(list)}</li>);
    this.setState({ lists:body.lists }); 
    this.setState({formattedLists: listMap})
  };


  render() {
    return (
      
      <Grid container display="flex" spacing={2} justifyContent="center" alignItems="flex-start">
        <Grid item lg={12} >
        <form onSubmit={this.createList}>
          <p>
            <strong>Make a list :)</strong>
          </p>
          <input
            type="text"
            value={this.state.listName}
            onChange={e => this.setState({ listName: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        </Grid>
        <Grid>
          Add a podcast with dummy data to first list:<br></br>
          <button id='1' onClick={this.addPodcastToList}>ADD PODCAST</button>
        </Grid>
        <Grid>
        &nbsp;&nbsp;Add an episode with dummy data to first list:<br></br>
          <button id='1' onClick={this.addEpisodeToList}>ADD EPISODE</button>
        </Grid>
        <Grid>
        &nbsp;&nbsp;Remove a podcast with dummy data from first list:<br></br>
          <button id='1' onClick={this.removePodcastFromList}>REMOVE PODCAST</button>
        </Grid>
        <Grid>
        &nbsp;&nbsp;Remove an episode with dummy data from first list:<br></br>
          <button id='1' onClick={this.removeEpisodeFromList}>REMOVE EPISODE</button>
        </Grid>
        <Grid item lg={12} >
          Current user's lists:<br></br>
          <ul>{this.state.formattedLists}</ul>
        </Grid>

        <Grid container display="flex" flexDirection="column" item lg={3} spacing={2} alignItems="stretch" justifyContent="center">
          <Grid item lg={12} >
              <Item> <FriendActivity /> </Item>
          </Grid>
          <Grid item lg={12}>
            <Item> <AllLists /> </Item>
          </Grid>
        </Grid>
        <Grid item lg={5}>
          <Item> <ListsHighlight listSize="large"/> </Item>
        </Grid>
        <Grid item lg={3}>
          <Item> <FriendActivity /> </Item>
        </Grid>
      </Grid>
    );
  }
}


export default HomePage;

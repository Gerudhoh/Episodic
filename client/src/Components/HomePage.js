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
      
    };
  }

  handleStateChange = async(e) => {
    await this.setState({ [e.target.id]: e.target.value });
  }


  render() {
    return (
      
      <Grid container display="flex" spacing={2} justifyContent="center" alignItems="flex-start">

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

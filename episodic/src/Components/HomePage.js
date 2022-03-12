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

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
}));


function homePageStack(){
  return(
    <React.Fragment>
    <Stack alignItems="flex-start" justifyContent="space-evenly" direction="row" spacing={2} sx={{padding:"20px"}}>
        <Item sx={{maxWidth:"60%"}}><ListsHighlight listSize="small"/></Item>
        <Item sx={{maxWidth:"40%"}}><FriendActivity activitySize="small" /></Item>
    </Stack>
    </React.Fragment>
  );
}

<<<<<<< HEAD


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
=======
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
      <Item sx={{maxWidth:"50%"}}><ListsHighlight listSize="large"/></Item>
      <Item sx={{maxWidth:"25%"}}>
        <Typography variant="h4">Friend Activity</Typography>
        <FriendActivity activitySize="large" />
      </Item>
    </Stack>
  );
>>>>>>> more components added
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

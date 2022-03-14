//Packages
import * as React from 'react';
import { Link } from 'react-router-dom';

//Material UI Components
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
//import CardActionButtons from './CardActionButtons.js';


//Styling

const EpisodeCardStyles = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  backgroundColor: '#533745',
  opacity: 0,
  color: '#D7C0AD',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  '&:hover': {
    opacity: 0.6,
  }
}));

const episodeCardStyles = {
  small:
  {
    minSize: 100,
    buttonSize: "inherit",
    fontSize: 14,
    iconSize: { height: '15px', width: '15px' }
  },
  medium: {
    minSize: 120,
    buttonSize: "inherit",
    fontSize: 16,
    iconSize: { height: '25px', width: '25px' }
  },
  large: {
    minSize: 180,
    buttonSize: "inherit",
    fontSize: 20,
    iconSize: { height: '25px', width: '25px' }
  }
};

class EpisodeCard extends React.Component {

  constructor(props) {
    super(props);

    this.size = episodeCardStyles[this.props.cardSize];
    this.img = this.props.img;
    this.id = this.props.id;
    this.podcastTitle = this.props.podcastTitle;
    this.episodeTitle = this.props.episodeTitle;

    this.isPodcast = false;
    this.uri = '';
    if (this.podcastTitle){
      this.isPodcast = true;
      this.uri = `/info/${encodeURIComponent(this.props.podcastTitle)}`;
    } 
    if (this.episodeTitle) {
      this.isPodcast = false;
      this.uri = `/info/${encodeURIComponent(this.props.podcastTitle)}/${encodeURIComponent(this.props.episodeTitle)}`;
    }

    

    this.state = {
      listView: this.props.listView || false,
      lists: [],
      listMenuItems: null,
      showSuccess: false
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  addPodcastToList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/add/podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.value], podcastId: this.id }),
    });
    const body = await response.json();
    this.setState({ showSuccess: body.success });
    window.location.reload(false);

  };

  getUserLists = async e => {
    //e.preventDefault();
    const response = await fetch("/api/v1/lists/get/all");
    const body = await response.json();
    let listNames = [];
    body.lists.map((list, index) =>
      listNames.push((<MenuItem key={index} value={index}>{list.name}</MenuItem>))
    );
    this.setState({ listMenuItems: listNames });
    this.setState({ lists: body.lists });
  };

  render() {
    return (

      /*<Stack spacing={1}>
        <img
          src={`${this.img}?w=${this.imgSize}&h=${this.imgSize}&fit=crop&auto=format`}
          alt={this.title}
          loading="lazy"
        />
        {this.state.showSuccess ? (<Alert severity="success">
          Successfully added to list!
        </Alert>) : (null)}
        {!this.state.listView ? (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Add to List</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={this.addPodcastToList}
            >
              {this.state.listMenuItems}
            </Select>
          </FormControl>
        ) : (null)}
      </Stack>*/
      <Card className="EpisodeCard" >
        <Box sx={{ position: 'relative' }} component={Link} to={this.uri} replace>
          < img width={this.size.minSize} height="auto"
            src={this.img}
            alt={`${this.episodeTitle} ${this.podcastTitle}`}
            loading="lazy"
          />
          <EpisodeCardStyles>
            <Typography variant="p" fontSize={this.size.fontSize}>{this.episodeTitle}</Typography>
            <br />
            <Typography variant="p" fontSize={this.size.fontSize}>{this.podcastTitle}</Typography>
            
          </EpisodeCardStyles>
          
        </Box>

        {!this.state.listView && this.isPodcast ? (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Add to List</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={this.addPodcastToList}
            >
              {this.state.listMenuItems}
            </Select>
          </FormControl>
        ) : (null)}
      </Card>
    );
  }
}
export default EpisodeCard;
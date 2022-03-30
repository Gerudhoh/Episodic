//Packages
import * as React from 'react';
import { Link } from 'react-router-dom';

//Material UI Components
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
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

    /*this.description = this.props.description;
    this.rss = this.props.rss;
    this.website = this.props.website;
    this.publisher = this.props.publisher;
    this.language = this.props.language;
    this.genre = this.props.genre;
    this.explicit = this.props.explicit;
    this.totalEpisodes = this.props.totalEpisodes;
    this.platforms = this.props.platforms;
    this.audioLengthSeconds = this.props.audioLengthSeconds;*/
    this.isPodcast = false;
    this.uri = '';
    if (this.podcastTitle && !this.episodeTitle) {
      this.isPodcast = true;
      this.uri = `/info/${encodeURIComponent(this.props.podcastTitle)}`;
    }
    if (this.episodeTitle) {
      this.isPodcast = false;
      this.uri = `/episodeinfo/${encodeURIComponent(this.props.podcastTitle)}/${encodeURIComponent(this.props.episodeTitle)}`;
    }



    this.state = {
      listView: this.props.listView || false,
      currentList: this.props.currentList || null,
      lists: [],
      listMenuItems: null,
      showSuccess: false
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  removePodcast = async e => {
    const response = await fetch('/api/v1/lists/remove/podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.currentList, name: this.podcastTitle, id: this.props.props.userId }),
    });
    const body = await response.json();
    this.setState({ showSuccess: body.success });
    if (this.state.showSuccess) window.location.reload(false);

  };

  removeEpisode = async e => {
    const response = await fetch('/api/v1/lists/remove/episode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.currentList, name: this.episodeTitle, id: this.props.props.userId, podcastName: this.podcastTitle }),
    });
    const body = await response.json();
    this.setState({ showSuccess: body.success });
    if (this.state.showSuccess) window.location.reload(false);

  };

  getUserLists = async e => {
    //e.preventDefault();
    const response = await fetch('/api/v1/lists/get/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  id: this.props.props.userId }),
    });
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

      <Card className="EpisodeCard" >
        <Stack>



          <Box sx={{ position: 'relative' }} component={Link} to={this.uri} replace>
            < img width={this.size.minSize} height="auto"
              src={this.img}
              alt={`${this.episodeTitle} ${this.podcastTitle}`}
              loading="lazy"
            />
            <EpisodeCardStyles>
            {this.isPodcast ? (
              <Typography><b>PODCAST</b></Typography>
            ) : (null)}

            {!this.isPodcast && this.episodeTitle ? (
              <Typography><b>EPISODE</b></Typography>
            ) : (null)}
              <Typography variant="p" fontSize={this.size.fontSize}><em>{this.episodeTitle}</em></Typography>
              <br />
              <Typography variant="p" fontSize={this.size.fontSize}><b>{this.podcastTitle}</b></Typography>


            </EpisodeCardStyles>

          </Box>


          {this.state.listView && this.isPodcast ? (
            <FormControl fullWidth>
              <Button variant="contained" onClick={this.removePodcast}>Remove</Button>
            </FormControl>
          ) : (null)}

          {this.state.listView && !this.isPodcast ? (
            <FormControl fullWidth>
              <Button variant="contained" onClick={this.removeEpisode}>Remove</Button>
            </FormControl>
          ) : (null)}
        </Stack>
      </Card>
    );
  }
}
export default EpisodeCard;

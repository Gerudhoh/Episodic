//Packages
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CardMedia from "@mui/material/CardMedia";
import Alert from '@mui/material/Alert';


//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import PodcastEpisodesCard from './PodcastEpisodesCard.js';
import Reviews from './Reviews.js'

const Item = styled(Paper)(({ theme }) => ({
  padding: 10,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const regex = /(<([^>]+)>)/ig;

class AddEpisodeToList extends React.Component {
  constructor(props) {
    super(props);
    this.episode = this.props.episode;
    this.image = this.props.image;

    this.state = {
      listView: this.props.listView || false,
      currentList: this.props.currentList || null,
      lists: [],
      listMenuItems: null,
      showSuccess: false,
      showSuccess: false,
      showError: false,
      msg: "",
      userId: props.userId
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.setState({ userId: nextProps.userId })
      this.episode = nextProps.episode;
      this.image = nextProps.image;
      this.getUserLists();
    }
  }

  addEpisodeToList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/add/episode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.value], episode: this.episode, image: this.image, id: this.props.userId }),
    });
    const body = await response.json();
    this.setState({ showSuccess: body.success });
    this.setState({ showSuccess: body.success });
    this.setState({ showError: !body.success });
    this.setState({ msg: body.msg });

  };

  getUserLists = async e => {
    let response = await fetch('/api/v1/lists/get/all/names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.userId }),
    });
    let body = await response.json();
    if (body.noUser === true) return;
    let listNames = [];
    body.lists.map((list, index) =>
      listNames.push((<MenuItem sx={{ bgcolor: 'primary.main', opacity: 1 }} key={index} value={index}>{list.name}</MenuItem>))
    );
    this.setState({ listMenuItems: listNames });
    this.setState({ lists: body.lists });
  };

  render() {
    return (
      <React.Fragment>
        <CardMedia className="podcastPlayer" component="audio" controls src={this.episode.audio} />
        {this.state.userId ? (
          <React.Fragment>
            <FormControl fullWidth>
              {this.state.showSuccess ? (<Alert severity="success">
                {this.state.msg}
              </Alert>
              ) : (null)}
              {this.state.showError ? (<Alert severity="error">
                {this.state.msg}
              </Alert>
              ) : (null)}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Add to List</InputLabel>
              <Select variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#774c47'
                    },
                  },
                }}
                onChange={this.addEpisodeToList}
              >
                {this.state.listMenuItems}
              </Select>
            </FormControl>
          </React.Fragment>
        ) : (null)}
      </React.Fragment>
    );
  }
};


function EpisodeDetails(props) {
  const episode = props.episode;
  const podcast = episode.podcast;
  const podURI = `/info/${encodeURIComponent(podcast.title)}`;
  return (
    <Stack direction="row" spacing={2} padding="10px" justifyContent="center">
      <img src={podcast.image} width="350px" alt={`Cover image for ${episode.title}`} />
      <Item sx={{ maxWidth: "55%" }}>
        <Stack alignItems="flex-start" spacing={2} padding="10px">
          <Typography textAlign="left" variant="h3">{episode.title}</Typography>
          <Typography variant="h4" component={Link} to={podURI} replace>{podcast.title}</Typography>
          <AddEpisodeToList episode={episode} image={podcast.image} userId={props.userId} />
          <Rating readOnly size="large" value={props.rating} />
          <Typography component="div" textAlign="left" variant="p">{episode.description.replace(regex, '')}</Typography>
        </Stack>
      </Item>
    </Stack>
  );
}

export default function EpisodeInfo(props) {

  useEffect(() => {
  }, [props]);

  const episode = props.episode;
  return (
    <Stack spacing={2} padding="10px" justifyContent="center" alignItems="center">
      <Item sx={{ width: "80%" }}><EpisodeDetails episode={episode} userId={props.userId} rating={props.rating} /></Item>
      <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="center">
        <Item sx={{ width: "45%" }}>
          <Typography variant="h3">More From {episode.podcast.title}</Typography>
          <PodcastEpisodesCard episodes={episode.podcast.episodes.items} userId={props.userId} image={episode.podcast.image} podcastTitle={episode.podcast.title} />
        </Item>
        <Item sx={{ width: "45%" }} height="45vh">
          <Typography variant="h3">Reviews</Typography>
          <Box component="div" height="45vh" sx={{ overflow: 'auto', padding: '10px' }}>
            <Reviews userId={props.userId} currentRating={props.rating} episode={episode} />
          </Box>
        </Item>
      </Stack>
    </Stack>
  );
}

import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import ListPreview from "./ListPreview.js";

const lists = [
  {
    name: "episodes",
    type: "user",
    images: [
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast',
        episodeTitle: 'episode1',
      },
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast',
        episodeTitle: 'episode2',
      },
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast',
        episodeTitle: 'episode3',
      },
    ]
  },
  {
    name: "podcasts",
    type: "user",
    images: [
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast1',
        episodeTitle: ''
      },
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast2',
        episodeTitle: ''
      },
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast1',
        episodeTitle: '',
      },
    ]
  },
  {
    name: "episodes",
    type: "user",
    images: [
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast3',
        episodeTitle: '',
      },
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast',
        episodeTitle: 'episode5',
      },
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast',
        episodeTitle: 'episode6',
      },
    ]
  },
]

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

class ListsHighlight extends React.Component {

  constructor(props) {
    super(props);
    this.size = this.props.listSize;

    this.state = {
      allLists: []
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  getUserLists = async e => {
    //e.preventDefault();
    let response = await fetch("/api/v1/lists/get/all");
    let body = await response.json();
    if(body.noUser === true) {
      await delay(1000); //in case user is already logged in, wait for the auth
      response = await fetch("/api/v1/lists/get/all");
      body = await response.json();
    }
    let listNames = [];
    body.lists.map((list) => {
      let tmp = { name: list.name, images: [] };
      let i = 0;
      list.podcasts?.map((podcast) => {
        if (i < 3) {
          
          console.log(podcast.title);
          tmp.images.push({
            img: podcast.image,
            podcastTitle: podcast.title,
            listView: true,
            id: podcast.listenNotesId,
            currentList: list
          });
        }
        i++;
      })
      // Add podcasts/episodes as images if there are any
      // I'm not entirely sure how to do this. We need the podcasts to be clickable (?) but they are just images + titles here
      listNames.push(tmp)
    });
    this.setState({ allLists: listNames });
  };

  render() {
    return (
      <Box>
        <Typography>Lists</Typography>
        <Stack spacing={2}>
          {this.state.allLists.map((item) => (
            <Item key={item.name}>
              <ListPreview listName={item.name} images={item.images} listSize={this.size} />
            </Item>
          ))}
        </Stack>
      </Box>
    );
  }
}

export default ListsHighlight;
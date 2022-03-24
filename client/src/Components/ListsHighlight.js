import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';

import { useEffect } from 'react';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import ListPreview from "./ListPreview.js";

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

class ListsHighlightClass extends React.Component {

  constructor(props) {
    super(props);
    this.size = this.props.listSize;

    this.state = {
      allLists: [],
      userId: this.props.userId
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.setState({ userId: nextProps.userId })
      this.getUserLists();
    }
  }

  getUserLists = async e => {
    if (!this.state.userId) return;
    let response = await fetch('/api/v1/lists/get/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.userId }),
    });
    let body = await response.json();
    if (body.noUser === true) return;
    let listNames = [];
    body.lists.map((list) => {
      let tmp = { name: list.name, images: [] };
      let i = 0;
      list.podcasts?.map((podcast) => {
        if (i < 3) {

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

      let remainder = 5 - i;
      i = 0;
      list.episodes?.map((episode) => {
        if (i < remainder) {
          tmp.images.push({
            img: episode.image,
            episodeTitle: episode.title,
            podcastTitle: episode.podcast,
            listView: true,
            currentList: list,
          });
        }

        i++;

      })
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
              <ListPreview listName={item.name} images={item.images} listSize={this.size} userId={this.state.userId} />
            </Item>
          ))}
        </Stack>
      </Box>
    );
  }
}

<<<<<<< HEAD
export default function ListsHighlight(props) {

  useEffect(() => {
  }, [props]);

  return (
    <ListsHighlightClass listSize={props.listSize} userId={props.userId} />
  );
}
=======
export default ListsHighlight;
>>>>>>> kinda fixed all list views, kinda not

import * as React from 'react';
//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EpisodeCardList from './EpisodeCardList.js';


const list = {
  name: 'list1',
  images: [
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP1',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP2',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP63',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP4',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP5',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP6',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP7',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP8',
    },
    {
      img: '/pepekingprawn.jpg',
      title: 'PKP9',
    },
  ],
};


class ExploreListView extends React.Component {

  constructor(props) {
    super(props);
    this.size = this.props.listSize;

    let location = window.location.href.split("/");

    this.state = {
      list: { name: 'Loading...', images: [] },
      location: location[location.length - 1]
    };
  }


  componentDidMount() {
    this.getUserList();
  }



  getUserList = async e => {

    const response = await fetch('/api/v1/lists/get/one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.location }),
    });
    //let response = await fetch("/api/v1/lists/get/one");
    let body = await response.json();
    let tmp = { name: body.list.name, images: [] };
    body.list.podcasts?.map((podcast) => {

      tmp.images.push({
        img: podcast.image,
        podcastTitle: podcast.title,
        listView: true,
        id: podcast.listenNotesId,
        currentList: list
      });

    })
    this.setState({ list: tmp });
  };

  render() {
    return (
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h4">{this.state.list.name}</Typography>
        </Stack>
        <Stack>
          <EpisodeCardList images={this.state.list.images} listSize={"large"} listView={true} />
        </Stack>
      </Stack>
    );
  }
}

export default ExploreListView;
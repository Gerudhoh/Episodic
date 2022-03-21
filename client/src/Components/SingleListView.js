import * as React from 'react';
//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EpisodeCardList from './EpisodeCardList.js';

import {useLocation} from 'react-router-dom';


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


const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

class SingleListViewClass extends React.Component {

  constructor(props) {
    super(props);
    this.size = this.props.listSize;
    
    this.location = decodeURIComponent(this.props.location.split('/')[2]);

    this.state = {
      list: { name: 'Loading...', images: [] },
      listObj: {}
    };
  }


  componentDidMount() {
    this.getUserList();
  }

  getUserList = async e => {
    await delay(500);
    const response = await fetch('/api/v1/lists/get/one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.location, id: this.props.userId }),
    });
    let body = await response.json();
    this.setState({ listObj: body.list });
    let tmp = { name: body.list.name, images: [] };
    body.list.podcasts?.map((podcast) => {

      tmp.images.push({
        img: podcast.image,
        podcastTitle: podcast.title,
        listView: true,
        id: podcast.listenNotesId,
        currentList: this.state.listObj
      });

    })
    body.list.episodes?.map((episode) => {

      tmp.images.push({
        img: episode.image,
        episodeTitle: episode.title,
        podcastTitle: episode.podcast,
        listView: true,
        currentList: this.state.listObj,
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
          <EpisodeCardList images={this.state.list.images} listSize={"large"} userId={this.props.userId} listView={true} />
        </Stack>
      </Stack>
    );
  }
}

export default function SingleListView(props){
  const location = useLocation();
  return(
    <SingleListViewClass location={location.pathname} listSize={props.listSize} userId={props.userId}/>
  );
}
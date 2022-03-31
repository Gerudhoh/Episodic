import * as React from 'react';
//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import EpisodeCardList from './EpisodeCardList.js';

import { useEffect } from 'react';

import { useLocation, Navigate } from 'react-router-dom';

class SingleListViewClass extends React.Component {

  constructor(props) {
    super(props);
    this.size = this.props.listSize;

    this.location = decodeURIComponent(this.props.location.split('/')[2]);

    this.state = {
      list: {},
      isLoading: true,
      listObj: {},
      userId: this.props.userId,
      redirect: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ userId: nextProps.userId });
    //this.getUserList();
  }

  componentDidMount() {
    this.getUserList();
  }

  getUserList = async e => {
    if (!this.state.userId) return;
    const response = await fetch('/api/v1/lists/get/one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.location, id: this.state.userId }),
    });
    let body = await response.json();
    if (body.success = false) return;
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
    this.setState({ isLoading: false });
  };

  deleteList = async e => {
    if (!this.state.userId) return;
    const response = await fetch('/api/v1/lists/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.location, id: this.state.userId }),
    });

    let body = await response.json();
    if (body.success = false) return;
    this.setState({ redirect: true })
  };

  render() {
    return (
      <Stack>
        {this.state.redirect ? (<Navigate to="/" />) : null}
        {this.state.isLoading ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Typography variant="h4">{this.state.list.name}</Typography>
              {this.state.userId ? (
                <Button variant="contained" onClick={this.deleteList}>Delete</Button>
              ) : (null)}

            </Stack>
            <Stack>
              <EpisodeCardList images={this.state.list.images} listSize={"large"} userId={this.props.userId} listView={true} />
            </Stack>
          </Stack>
        )}
      </Stack>

    );
  }
}

export default function SingleListView(props) {
  const location = useLocation();

  useEffect(() => {
  }, [location, props]);

  return (
    <SingleListViewClass location={location.pathname} listSize={props.listSize} userId={props.userId} />
  );
}
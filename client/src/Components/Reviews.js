import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { useLocation } from 'react-router-dom';

//Custom Components
import ActivityCard from "./ActivityCard.js";

function getParsedDate(strDate){
  var strSplitDate = String(strDate).split(' ');
  var date = new Date(strSplitDate[0]);
  // alert(date);
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!

  var yyyy = date.getFullYear();
  if (dd < 10) {
      dd = '0' + dd;
  }
  if (mm < 10) {
      mm = '0' + mm;
  }
  date =  dd + "-" + mm + "-" + yyyy;
  return date.toString();
}

class ReviewsClass extends React.Component {
  constructor(props) {
    super(props);
    this.userId = this.props.userId;
    this.location = this.props.location.split('/');
    this.currentRating = this.props.currentRating;
    this.podcast = this.props.podcast;
    this.episode = this.props.episode;

    this.podcastName = decodeURIComponent(this.location[2]);
    this.episodeName = decodeURIComponent(this.location[3]);
    this.isEpisode = false;
    if (this.location.length > 3) this.isEpisode = true;

    this.image = "";
    if (this.isEpisode){
      this.image = this.episode.podcast.image;
    }
    else {
      this.image = this.podcast?.image;
    }

    this.state = {
      reviews: [],
      newReviewText: "",
      newReviewRating: 0
    }
  }

  componentDidMount() {
    this.getReviews();
  }

  componentWillReceiveProps(nextProps) {
    this.userId = nextProps.userId;
  }

  getReviews = async e => {
    if (this.isEpisode) {
      let response = await fetch('/api/v1/reviews/get/episode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.episodeName, podcastName: this.podcastName }),
      });
      let body = await response.json();
      let tmpArray = [];
      body.results.reverse().map((item, index) =>
        tmpArray.push(({
          location: this.fullLocation,
          name: item.username,
          activityType: "newReview",
          activityInfo: {
            image: this.image,
            rating: item.rating,
            date: getParsedDate(item.creationDate),
            reviewText: unescape(item.description),
            title: this.episodeName + " (" + this.podcastName + ")"
          }
        }))
      );

      this.setState({ reviews: tmpArray });
    }
    else {
      let response = await fetch('/api/v1/reviews/get/podcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.podcastName }),
      });
      let body = await response.json();
      let tmpArray = [];
      body.results.reverse().map((item, index) =>
        tmpArray.push(({
          name: item.username,
          activityType: "newReview",
          activityInfo: {
            image: this.image,
            rating: item.rating,
            date: getParsedDate(item.creationDate),
            reviewText: unescape(item.description),
            title: this.podcastName
          }
        }))
      );

      this.setState({ reviews: tmpArray });
    }
  }

  createReview = async e => {
    e.preventDefault();
    if (this.isEpisode) {
      let response = await fetch('/api/v1/reviews/add/episode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.userId, name: this.episodeName, currentRating: this.currentRating, newRating: this.state.newReviewRating, newText: this.state.newReviewText, episode: this.episode }),
      });
      let body = await response.json();
      if (body.success) window.location.reload(false);
    }
    else {
      let response = await fetch('/api/v1/reviews/add/podcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.userId, name: this.podcastName, currentRating: this.currentRating, newRating: this.state.newReviewRating, newText: this.state.newReviewText, podcast: this.podcast }),
      });
      let body = await response.json();
      if (body.success) window.location.reload(false);
    }
  };


  render() {
    return (
      <Box container>
        {this.userId ? (
          <Box component="form" onSubmit={this.createReview}>
            <Stack direction="column" spacing={2} justifyContent="flex-start">
              <Typography variant="h4" textAlign="center">Leave a Review</Typography>
              <center>
                <Rating
                  required
                  name="simple-controlled"
                  size="large"
                  value={this.state.newReviewRating}
                  onChange={e => this.setState({ newReviewRating: e.target.value })}
                />
              </center>
              <TextField
                id="new-list-input"
                multiline={true}
                type="text"
                value={this.state.newReviewText}
                label="(Optional) Add more detail:"
                inputProps={{ maxLength: 200 }}
                onChange={e => this.setState({ newReviewText: e.target.value })}
              />
              <Button variant="contained" disabled={this.state.newReviewRating == 0} type="submit">Submit Review</Button>
            </Stack>
          </Box>
        ) : (null)}
        <br></br>
        <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
          {this.state.reviews?.map((item) => (
            <ActivityCard key={item.name} activityType={item.activityType} userName={item.name} userId={this.userId} activityInfo={item.activityInfo} activitySize="large" />
          ))}
        </Stack>
      </Box>
    )
  }
}

export default function Reviews(props) {
  const location = useLocation();
  return (
    <ReviewsClass location={location.pathname} userId={props.userId} currentRating={props.currentRating} podcast={props.podcast} episode={props.episode} />
  );
}
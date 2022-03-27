import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import {useLocation} from 'react-router-dom';

//Custom Components
import ActivityCard from "./ActivityCard.js";

const reviews = [
  {
    name: "name1",
    activityType: "newReview",
    activityInfo: {
      rating: 5,
      date: "Feb 22 2022",
      reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },

  {
    name: "name2",
    activityType: "newReview",
    activityInfo: {
      rating: 5,
      date: "Feb 22 2022",
      reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },
  {
    name: "name3",
    activityType: "newReview",
    activityInfo: {
      rating: 5,
      date: "Feb 22 2022",
      reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },
  {
    name: "name4",
    activityType: "newReview",
    activityInfo: {
      rating: 5,
      date: "Feb 22 2022",
      reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },
]

class ReviewsClass extends React.Component {
  constructor(props) {
    super(props);
    this.userId = this.props.userId;
    this.location = this.props.location.split('/');
    this.currentRating = this.props.currentRating;
    this.podcast = this.props.podcast;

    this.podcastName = decodeURIComponent(this.location[2]);
    this.episodeName = decodeURIComponent(this.location[3]);
    this.isEpisode = false;
    if (this.location.length > 3) this.isEpisode = true;

    this.state = {
      reviews: reviews,
      newReviewText: "",
      newReviewRating: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.userId = nextProps.userId;
  }

  createReview = async e => {
    e.preventDefault();
    if (this.isEpisode) {
      console.log("not implemented");
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

export default function Reviews(props){
  const location = useLocation();
  return(
    <ReviewsClass location={location.pathname} userId = {props.userId} currentRating = {props.currentRating} podcast = {props.podcast} />
  );
}
import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

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

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.userId = props.userId;
    this.username = props.username;


    this.state = {
      reviews: reviews,
      newReviewText: "",
      newReviewRating: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.userId = nextProps.userId;
    this.username = nextProps.username;
  }

  createReview = async e => {
    e.preventDefault();
    console.log(this.state.newReviewRating)
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
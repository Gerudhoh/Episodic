import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { useLocation } from 'react-router-dom';

//Custom Components
import ActivityCard from "./ActivityCard.js";

function getParsedDate(strDate) {
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
  date = dd + "-" + mm + "-" + yyyy;
  return date.toString();
}

class ReviewsUserClass extends React.Component {
  constructor(props) {
    super(props);

    this.currentRating = this.props.currentRating;
    this.podcast = this.props.podcast;
    this.episode = this.props.episode;

    if (this.podcast) {
      this.podcastName = this.podcast?.title;
      this.isEpisode = false;
    }
    if (this.episode) {
      this.episodeName = this.episode?.title;
      this.podcastName = this.episode?.podcast.title;
      this.isEpisode = true;
    }

    this.image = "";
    if (this.isEpisode) {
      this.image = this.episode.podcast.image;
    }
    else {
      this.image = this.podcast?.image;
    }

    this.state = {
      reviews: [],
      newReviewText: "",
      newReviewRating: 0,
      showSuccess: false,
      successMessage: "Success",
      showError: false,
      userId: this.props.userId
    }
  }

  componentDidMount() {
    this.getReviews();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.state.userId = nextProps.userId;
      this.getReviews();
    }
  }

  getReviews = async e => {
    if (!this.state.userId) return;
    let response = await fetch('/api/v1/reviews/get/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.userId }),
    });
    let body = await response.json();
    console.log(body.results);
    let tmpArray = [];
    body.results.reverse().map((item, index) => {
      let tmpTitle = "";
      let tmpImage = "";
      let tmpLocation = "";
      if (item.podcastName){
        tmpTitle = item.podcastName;
        tmpImage = item.podcastImage;
        tmpLocation = "/info/" + unescape(item.podcastName);
      } 
      else{
        tmpTitle = item.episodeName + " (" + item.episodesPodcastName + ")";
        tmpImage = item.episodeImage;
        tmpLocation = "/episodeinfo/" + unescape(item.episodesPodcastName) + "/" + unescape(item.episodeName);
      } 
      tmpArray.push(({
        location: tmpLocation,
        name: item.username,
        activityType: "review",
        activityInfo: {
          image: tmpImage,
          rating: item.rating,
          date: getParsedDate(item.creationDate),
          reviewText: unescape(item.description),
          title: unescape(tmpTitle)
        }
        
      }))
    
    });

    this.setState({ reviews: tmpArray });
  }


  render() {
    return (
      <Box container>
        <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
          {this.state.reviews?.map((item) => (
            <ActivityCard key={item.name} activityType={item.activityType} userName={item.name} userId={this.state.userId} activityInfo={item.activityInfo} location={item.location} activitySize="large" />
          ))}
        </Stack>
      </Box>
    )
  }
}

export default function ReviewsUser(props) {
  const location = useLocation();
  return (
    <ReviewsUserClass location={location.pathname} userId={props.userId} currentRating={props.currentRating} podcast={props.podcast} episode={props.episode} />
  );
}
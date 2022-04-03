import * as React from 'react';
import { Link } from 'react-router-dom';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

//Material UI Icons and Styling
import ArrowForward from '@mui/icons-material/ArrowForward';

//Custom Components
import UserInfo from "./UserInfo.js";
import ReviewPreview from "./ReviewPreview.js";
import EpisodeCardList from "./EpisodeCardList.js";

//Styling
const activityCardStyles = {
  small:
  {
    avSize: "small",
    buttonSize: "small",
    fontSize: '1em'
  },
  medium: {
    avSize: "medium",
    buttonSize: "inherit",
    fontSize: '1em'
  },
  large: {
    avSize: "large",
    buttonSize: "large",
    fontSize: '1em',
  }
};


function NewListPreview(props) {
  return (
    <Stack alignItems="flex-start" spacing={2}>
      <Typography fontSize={props.fontSize}>{props.reviewText}</Typography>
      <EpisodeCardList listName={props.listName} images={props.images} userId={props.userId} listSize="small"/>
    </Stack>
  );
}

function MoveListPreview(props) {
  return (
    <Stack alignItems="flex-start" spacing={2}>
      <Typography fontSize={props.fontSize}>{props.reviewText}</Typography>
      <EpisodeCardList listName={props.listName} images={props.images} userId={props.userId} listSize="small"/>
    </Stack>
  );
}

function AddEpisodePreview(props){
  return(
    <Stack alignItems="flex-start" spacing={2}>
      <Typography fontSize={props.fontSize}>{props.reviewText}</Typography>
      <EpisodeCardList listName={props.listName} images={props.images} userId={props.userId} listSize="small"/>
    </Stack>
  );
}


export default function ActivityCard(props) {
  const size = activityCardStyles[props.activitySize];
  console.log(props);

  const ActivityPreview = (activityType) => {
    if (props.activityType === 'newList'){
      return (<NewListPreview fontSize={size.fontSize} listName={props.activityInfo.listName} images={props.activityInfo.images} reviewText={props.activityInfo.reviewText} />);
    }
    else if (props.activityType === 'listMove') {
      return (<MoveListPreview fontSize={size.fontSize} listName={props.activityInfo.listName} images={props.activityInfo.images} reviewText={props.activityInfo.reviewText} />);
    }
    else if (props.activityType === 'newReview') {
      return (<ReviewPreview
        reviewText={props.activityInfo.reviewText}
        date={props.activityInfo.date}
        rating={props.activityInfo.rating}
        image={props.activityInfo.image}
        title={props.activityInfo.title}
      />);
    }
  };

  return (
    <Stack spacing={2} alignItems="center" justifyContent="space-between" direction="row">
      <Stack spacing={2} alignItems="space-evenly" justifyContent="space-around">
        <UserInfo userName={props.userName} fontSize={size.fontSize} avatarSize={size.avSize} />
        {ActivityPreview(props.activityType)}
      </Stack>
      {props.location ? (
        <IconButton aria-label="seeMore" size={size.buttonSize} component={Link} to={props.location}>
          <ArrowForward />
        </IconButton>
      ) : (null)}
     
    </Stack>
  );
}

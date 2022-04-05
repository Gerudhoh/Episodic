import * as React from 'react';
import { Link } from 'react-router-dom';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
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
      <Typography fontSize={props.fontSize}>{props.reviewText}</Typography><br/>
    </Stack>
  );
}

function MoveListPreview(props) {
  return (
    <Stack alignItems="flex-start" spacing={2}>
      <Typography fontSize={props.fontSize}>{props.reviewText}</Typography>
    </Stack>
  );
}

function AddEpisodePreview(props) {
  return (
    <Stack alignItems="flex-start" spacing={2}>
      
      <Box sx={{ position: 'relative' }} replace>
            < img width="100" height="auto"
              src={props.image}
              alt={`${props.reviewText}`}
              loading="lazy"
            />
        <Typography fontSize={props.fontSize}>{props.reviewText}</Typography><br/>
      </Box>
    </Stack>
  );
}


export default function ActivityCard(props) {
  const size = activityCardStyles[props.activitySize];
  console.log(props);

  const ActivityPreview = (activityType) => {
    if (activityType === 'newList'){
      return (<NewListPreview fontSize={size.fontSize} listName={props.activityInfo.listName} image={props.activityInfo.image} reviewText={props.activityInfo.reviewText} />);
    }
    else if (activityType === 'listMove') {
      return (<MoveListPreview fontSize={size.fontSize} listName={props.activityInfo.listName} image={props.activityInfo.image} reviewText={props.activityInfo.reviewText} />);
    }
    else if (activityType === 'newReview') {
      return (<ReviewPreview
        reviewText={props.activityInfo.reviewText}
        date={props.activityInfo.date}
        rating={props.activityInfo.listName}
        image={props.image}
        title={props.activityInfo.podcastName}
      />);
    }
    else if (activityType === 'add') {
      return (<AddEpisodePreview fontSize={size.fontSize} listName={props.activityInfo.listName} image={props.image} reviewText={props.activityInfo.reviewText} size={size}/>);
    }
  };

  return (
    <Stack spacing={2} alignItems="center" justifyContent="space-between" direction="row">
      <Stack spacing={2} alignItems="space-evenly" justifyContent="space-around"  style={{marginBottom: "5px"}}>
        <UserInfo userName={props.userName} fontSize={size.fontSize} avatarSize={size.avSize}/>
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

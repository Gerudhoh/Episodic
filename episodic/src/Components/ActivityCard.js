import * as React from 'react';

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

const item ={
  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  title: 'Breakfast'
}

//Styling
const activityCardStyles ={
  small:
  {
    avSize: "small",
    buttonSize:"small",
    fontSize: '1em'
  },
  medium:{
    avSize: "medium",
    buttonSize:"inherit",
    fontSize: '1em'
  },
  large:{
    avSize: "large",
    buttonSize:"large",
    fontSize: '1em',
  }
};



function NewListPreview(props){
  return(
    <Stack alignItems="flex-start" spacing={2}>
      <Typography component="div" textAlign="left" variant="h6"> made new list listName </Typography>
      <EpisodeCardList listName={props.listName} images={props.images} listSize="small"/>
    </Stack>
  );
}

function MoveListPreview(props){
  return(
    <Stack alignItems="flex-start" spacing={2}>
      <Typography component="div" textAlign="left" variant="h6">moved podcastName from listName to listName</Typography>
      <EpisodeCardList listName={props.listName} images={props.images} listSize="small"/>
    </Stack>
  );
}


export default function ActivityCard(props){
  const size = activityCardStyles[props.activitySize];
  const activityType = props.activityType;

  const ActivityPreview = (activityType) => {
    if (activityType === 'newList'){
      return (<NewListPreview fontSize={size.fontSize} listName={props.activityInfo.listName} images={props.activityInfo.images} />);
    }
    else if (activityType === 'listMove') {
      return (<MoveListPreview fontSize={size.fontSize} listName={props.activityInfo.listName} images={props.activityInfo.images} />);
    }
    else if (activityType === 'newReview') {
      return (<ReviewPreview
        reviewText={props.activityInfo.reviewText}
        date={props.activityInfo.date}
        rating={props.activityInfo.rating}
        />);
    }
  };

  return (
    <Stack spacing={2} alignItems="center" justifyContent="space-between" direction="row">
      <Stack spacing={2} alignItems="space-evenly" justifyContent="space-around">
        <UserInfo userName={props.userName} fontSize={size.fontSize} avatarSize={size.avSize}/>
        {ActivityPreview(props.activityType)}
      </Stack>
      <IconButton aria-label="seeMore" size={size.buttonSize}>
          <ArrowForward />
        </IconButton>
    </Stack>
  );
}

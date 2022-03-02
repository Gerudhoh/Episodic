import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';

//Material UI Icons and Styling
import ArrowForward from '@mui/icons-material/ArrowForward';

//Custom Components
import UserInfo from "./UserInfo.js";
import ReviewPreview from "./ReviewPreview.js";


const item ={
  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  title: 'Breakfast'
}


export default function ActivityCard(props){
  const activityType = props.activityType;

  const ActivityPreview = (activityType) => {
    if (activityType == 'newList'){
      return (<Typography component="div" variant="p"> made new list listName </Typography>);
    }
    else if (activityType == 'listMove') {
      return (<Typography component="div" variant="p"> moved podcastName from listName to listName</Typography>);
    }
    else if (activityType == 'newReview') {
      return (<ReviewPreview userName={props.userName}
        reviewText={props.activityInfo.reviewText}
        date={props.activityInfo.date}
        rating={props.activityInfo.date}
        />);
    }
  };

  return (
    <Card sx={{display: 'flex', columns:3, alignItems:"center"}}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems:"center", justifyContent:"flex-start"}}>
        <UserInfo userName={props.userName}/>
        <CardContent>
          {ActivityPreview(props.activityType)}
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', justifyContent:"flex-end"}}>
        <CardActions>
          <Fab aria-label="seeMore" size="small">
            <ArrowForward />
          </Fab>
        </CardActions>
      </Box>
    </Card>
  );
}

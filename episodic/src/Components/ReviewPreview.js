import * as React from 'react';

//Material UI Components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Rating from '@mui/material/Rating';
//Material UI Icons and Styling
import ArrowForward from '@mui/icons-material/ArrowForward';

//Custom Components


const item ={
  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  title: 'Breakfast'
}

//Inner Components
function DateAndRating(props){
  return(
    <Grid container direction="row" spacing={2} item xs={12}>
      <Grid item xs={1}>
        <Typography>{props.date}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Rating readOnly value={props.rating} />
      </Grid>
    </Grid>
  );
}


export default function ReviewPreview(props){
  return (
    <Grid container direction="column" columns={3} spacing={2}>
      <Grid item xs={2}>
        <img className="podcastCover" src="/pepekingprawn.jpg" maxWidth={30} maxHeight={30} fit="crop"/>
      </Grid>
      <Grid container display="flex" flexDirection="row" spacing={1} item xs={12}>
        <Grid item>
          <Typography>{props.userName} reviewed PodcastTitle EpisodeTitle(opt)</Typography>
        </Grid>
        <DateAndRating date={props.date} rating={props.rating}/>
        <Grid item>
          <Typography text-overflow="ellipsis">{props.reviewText}</Typography>
        </Grid>
      </Grid>

    </Grid>
  );
}

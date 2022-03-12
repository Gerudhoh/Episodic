import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

//Inner Components
function DateAndRating(props){
  return(
    <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
      <Typography noWrap={true}>{props.date}</Typography>
      <Rating readOnly value={parseInt(props.rating)} />
    </Stack>
  );
}


export default function ReviewPreview(props){
  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={2}>
      <img className="podcastCover" src="/pepekingprawn.jpg" width="20%" height="auto"/>
      <Box container sx={{display:"flex", alignItems:"flex-start", justifyContent:"flex-start", flexDirection:"column", flexWrap:"wrap"}}>
        <Typography component="div" textAlign="left" variant="h6">reviewed PodcastTitle EpisodeTitle(opt)</Typography>
        <DateAndRating date={props.date} rating={props.rating}/>
        <div style={{overflow:'hidden', textOverflow:"ellipsis", maxWidth:'10rem'}}>
          <Typography noWrap={true} component="div" textAlign="left" variant="p">{props.reviewText}</Typography>
        </div>
      </Box>
    </Stack>
  );
}

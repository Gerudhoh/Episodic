import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

//Material UI Styling and Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

//Custom Components
import EpisodeCard from "./EpisodeCard.js"


export default function EpisodeCardList(props){
  return(
    <Stack spacing={2} direction="row" justifyContent="space-evenly" alignItems="center">
      {props.images?.map((item) => (
        <EpisodeCard key={`EpisodeCard${item.title}`} img={item.img} title={item.title} cardSize={props.listSize} id={item.id}>
        </EpisodeCard>
      ))}
    </Stack>
  );
}

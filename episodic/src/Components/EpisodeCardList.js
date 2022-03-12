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
    <Stack flexWrap="wrap" spacing={2} direction="row" padding="10px" justifyContent="flex-start" alignContent="flex-start">
      {props.images.map((item) => (
        <EpisodeCard padding="10px" key={`EpisodeCard${item.title}`} img={item.img} title={item.title} cardSize={props.listSize}>
        </EpisodeCard>
      ))}
    </Stack>
  );
}

import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

import EpisodeCard from './EpisodeCard.js';

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const episodeCardStuff= {
  img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  title: 'Breakfast'
}

export default function AllComponents(){
  return(
    <React.Fragment>
    <Stack direction="row" spacing ={2} padding="10px">
      <Item>
        <Typography variant="h1" textAlign="left">Heading 1</Typography>
        <Typography variant="h2" textAlign="left">Heading 2</Typography>
        <Typography variant="h3" textAlign="left">Heading 3</Typography>
        <Typography variant="h4" textAlign="left">Heading 4</Typography>
        <Typography variant="h5" textAlign="left">Heading 5</Typography>
        <Typography variant="h6" textAlign="left">Heading 6</Typography>
        <Typography component="div" variant="p" textAlign="left">Paragraph</Typography>
      </Item>
      <Item>
        <IconButton aria-label="favorite">
          <AddIcon sx={{width:'25px', height:'25px'}}/>
        </IconButton>
        <IconButton  aria-label="like">
          <FavoriteIcon sx={{width:'25px', height:'25px'}}/>
        </IconButton>
        <IconButton aria-label="star">
          <StarIcon sx={{width:'25px', height:'25px'}}/>
        </IconButton>
        <Fab> <StarIcon sx={{width:'25px', height:'25px'}}/> </Fab>
      </Item>
      <Item>
        <EpisodeCard cardSize="large" img={episodeCardStuff.img} title={episodeCardStuff.title}/>
      </Item>
    </Stack>
    </React.Fragment>
  );
}

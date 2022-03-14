//Packages
import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

export default function CardActionButtons(props) {
  return (
    <Stack direction="row" justifyContent="center">
      <IconButton aria-label="favorite">
        <AddIcon sx={{width:'25px', height:'25px'}}/>
      </IconButton>
      <IconButton  aria-label="like">
        <FavoriteIcon sx={{width:'25px', height:'25px'}}/>
      </IconButton>
      <IconButton aria-label="star">
        <StarIcon sx={{width:'25px', height:'25px'}}/>
      </IconButton>
    </Stack>
  );
}

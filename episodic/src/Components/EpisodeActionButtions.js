//Packages
import * as React from 'react';

//Material UI Components
import IconButton from '@mui/material/IconButton';

function CardActionButtons(props) {
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

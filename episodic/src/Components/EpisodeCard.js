//Packages
import * as React from 'react';

//Material UI Components
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

//Material UI Icons and Styling
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

//Styling
const episodeCardStyles ={
  small:
  {
    minSize: 100,
    buttonSize: "inherit",
    fontSize: 14,
    iconSize: { height: '15px', width: '15px' }
  },
  medium:{
    minSize: 160,
    buttonSize: "inherit",
    fontSize: 16,
    iconSize: { height: '25px', width: '25px' }
  },
  large:{
    minSize: 180,
    buttonSize: "inherit",
    fontSize: 20,
    iconSize: { height: '25px', width: '25px' }
  }
};

//Inner Components
function CardActionButtons(props) {
  return (
    <Stack direction="row" justifyContent="center">
      <IconButton aria-label="favorite">
        <AddIcon sx={props.iconSize}/>
      </IconButton>
      <IconButton  aria-label="like">
        <FavoriteIcon sx={props.iconSize}/>
      </IconButton>
      <IconButton aria-label="star">
        <StarIcon sx={props.iconSize}/>
      </IconButton>
    </Stack>
  );
}

export default function EpisodeCard(props) {
  const size = episodeCardStyles[props.cardSize];
  const imgSize = size.minSize-20;
  return (
    <Stack spacing={1}>
        <img
          src={`${props.img}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format`}
          alt={props.title}
          loading="lazy"
        />
      <CardActionButtons iconSize={size.iconSize}/>
    </Stack>
  );
}

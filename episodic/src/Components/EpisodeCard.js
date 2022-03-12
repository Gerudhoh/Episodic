//Packages
import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';

//Material UI Icons and Styling
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

import CardActionButtons from './CardActionButtons.js';

//Styling
const episodeCardStyles ={
  small:
  {
    minSize: 100,
    buttonSize: "inherit",
    fontSize: 14,
  },
  medium:{
    minSize: 140,
    buttonSize: "inherit",
    fontSize: 16,
  },
  large:{
    minSize: 180,
    fontSize: 20,
  }
};

//Inner Components

export default function EpisodeCard(props) {
  const size = episodeCardStyles[props.cardSize];
  return (
    <Stack spacing={1}>
        <img width={size.minSize} height="auto"
          src={props.img}
          alt={props.title}
          loading="lazy"
        />
    </Stack>
  );
}

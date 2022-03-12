//Packages
import * as React from 'react';

//Material UI Components
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
  },
  medium:{
    minSize: 160,
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
  const imgSize = size.minSize-20;
  return (
    <Stack spacing={1}>
        <img
          src={`${props.img}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format`}
          alt={props.title}
          loading="lazy"
        />
    </Stack>
  );
}

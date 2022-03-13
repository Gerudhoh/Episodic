//Packages
import * as React from 'react';
import {Link} from 'react-router-dom';

//Material UI Components
import Box from '@mui/material/Box';

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
    minSize: 120,
    buttonSize: "inherit",
    fontSize: 16,
  },
  large:{
    minSize: 180,
    fontSize: 20,
  }
};


export default function EpisodeCard(props) {
  const size = episodeCardStyles[props.cardSize];
  const uri = `info/${encodeURIComponent(props.podcastTitle)}/${encodeURIComponent(props.episodeTitle)}`;
  return (
    <Box sx={{m:0.5}} className="EpisodeCard" component={Link} to={uri}>
        < img  width={size.minSize} height="auto"
          src={props.img}
          alt={`${props.episodeTitle} ${props.podcastTitle}`}
          loading="lazy"
        />
    </Box>
  );
}

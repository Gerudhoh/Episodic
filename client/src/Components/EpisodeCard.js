//Packages
import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';

//Material UI Icons and Styling
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

//Styling
const episodeCardStyles ={
  small:
  {
    minSize: 160,
    buttonSize:"small",
    fontSize: "20"
  },
  medium:{
    minSize: 200,
    buttonSize:"inherit",
    fontSize: "30"
  },
  large:{
    minSize: 200,
    buttonSize:"large",
    fontSize: "40",
  }
};

//Inner Components
function CardActionButtons(props) {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <IconButton size={props.buttonSize} aria-label="favorite">
        <AddIcon />
      </IconButton>
      <IconButton size={props.buttonSize}  aria-label="like">
        <FavoriteIcon />
      </IconButton>
      <IconButton size={props.buttonSize} aria-label="like">
        <StarIcon />
      </IconButton>
    </Stack>
  );
}

export default function EpisodeCard(props) {
  const size = episodeCardStyles[props.cardSize];
  const imgSize = size.minSize-20;
  return (
    <Card sx={{ width:size.minSize}}>
      <CardContent>
        <Typography fontSize={size.fontSize}>
          Podcast Title
        </Typography>
        <img
          src={`${props.img}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format`}
          alt={props.title}
          loading="lazy"
        />
      </CardContent>
      <CardActionButtons buttonSize={size.buttonSize}/>
    </Card>
  );
}

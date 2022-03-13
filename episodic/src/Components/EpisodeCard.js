//Packages
import * as React from 'react';
import {Link} from 'react-router-dom';

//Material UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
//import CardActionButtons from './CardActionButtons.js';

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

const EpisodeCardStyles = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top:0,
  backgroundColor: '#533745',
  opacity: 0,
  color: '#D7C0AD',
  width: '100%',
  height:'100%',
  textAlign:'center',
  '&:hover' :{
    opacity:0.6,
  }
}));


export default function EpisodeCard(props) {
  const size = episodeCardStyles[props.cardSize];
  const uri = `/info/${encodeURIComponent(props.podcastTitle)}/${encodeURIComponent(props.episodeTitle)}`;
  return (
    <Card className="EpisodeCard" component={Link} to={uri} replace>
      <Box sx={{position:'relative'}}>
        < img  width={size.minSize} height="auto"
          src={props.img}
          alt={`${props.episodeTitle} ${props.podcastTitle}`}
          loading="lazy"
        />
        <EpisodeCardStyles>
          <Typography variant="p" fontSize={size.fontSize}>{props.episodeTitle}</Typography>
          <br/>
          <Typography variant="p" fontSize={size.fontSize}>{props.podcastTitle}</Typography>
        </EpisodeCardStyles>
      </Box>

    </Card>
  );
}

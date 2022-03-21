import * as React from 'react';
import {Link} from 'react-router-dom';
//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

//Material UI Styling and Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

//Custom Components
import EpisodeCardList from "./EpisodeCardList.js"

const iconButtonSize ={
  small: { height: '25px', width: '25px' },
  medium: { height: '15px', width: '15px' },
  large: { height: '25px', width: '25px' }
}

export default function ListPreview(props) {
  return (
      <Stack spacing={0} direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Typography variant="h6" component={Link} to={`/userlist/${props.listName}`}>{props.listName}</Typography>
        <Stack direction="row" spacing={1} justifyContent="space-evenly" alignItems="center">
            <EpisodeCardList images={props.images} listSize={props.listSize} listView={true} userId={props.userId} />
            <IconButton aria-label="see more" >
              <ArrowForwardIcon sx={{ height: '25px', width: '25px' }}/>
            </IconButton>
        </Stack>
      </Stack>
  );
};

import * as React from 'react';

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
<<<<<<< HEAD
      <Grid container columnSpacing={3} direction="column" justifyContent="flex-start">
        <Grid item>
          <Typography>{props.listName}</Typography>
        </Grid>
        <Grid container direction="row" columnSpacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <ImageList style={ListPreviewStyles}>
              {props.images?.map((item) => (
                <EpisodeCard key={`EpisodeCard${item.title}`} img={item.img} title={item.title} cardSize={props.listSize}>
                </EpisodeCard>
              ))}
            </ImageList>
          </Grid>
          <Grid item>
            <Fab aria-label="see more" size={props.listSize}>
              <ArrowForwardIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
=======
      <Stack spacing={0} direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Typography variant="h6">{props.listName}</Typography>
        <Stack direction="row" spacing={1} justifyContent="space-evenly" alignItems="center">
            <EpisodeCardList images={props.images} listSize={props.listSize} />
            <IconButton aria-label="see more" >
              <ArrowForwardIcon sx={iconButtonSize[props.listSize]}/>
            </IconButton>
        </Stack>
      </Stack>
>>>>>>> more components added
  );
};

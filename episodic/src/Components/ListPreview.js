import * as React from 'react';

//Material UI Components
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';

//Material UI Styling and Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

//Custom Components
import EpisodeCard from "./EpisodeCard.js"

//Styling
const ListPreviewStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
};


export default function ListPreview(props) {
  return (
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
  );
};

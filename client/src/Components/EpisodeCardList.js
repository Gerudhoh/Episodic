import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
//import Typography from '@mui/material/Typography';
//import IconButton from '@mui/material/IconButton';

//Material UI Styling and Icons
//import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


//Custom Components
import EpisodeCard from "./EpisodeCard.js"

export default function EpisodeCardList(props) {
  return (
    <Stack flexWrap="wrap" spacing={2} direction="row" justifyContent="flex-start" alignItems="center" >
      {props.images?.map((item) => (
        <EpisodeCard props={props} key={`EpisodeCard${item.title}`} img={item.img} episodeTitle={item.episodeTitle} podcastTitle={item.podcastTitle} cardSize={props.listSize} id={item.id} listView={props.listView}
          description={item.description}
          rss={item.rss}
          website={item.website}
          publisher={item.publisher}
          language={item.language}
          genre={item.genre}
          explicit={item.explicit}
          totalEpisodes={item.totalEpisodes}
          platforms={item.platforms}
          audioLengthSeconds = {item.audioLengthSeconds}
          currentList = {item.currentList}>
        </EpisodeCard>
      ))}
    </Stack>
  );
}

import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import ListPreview from "./ListPreview.js";

const lists = [
    {
      name: "episodes",
      type: "user",
      images: [
        {
          img: '/pepekingprawn.jpg',
          podcastTitle: 'podcast',
          episodeTitle: 'episode1',
        },
        {
          img: '/pepekingprawn.jpg',
          podcastTitle: 'podcast',
          episodeTitle: 'episode2',
        },
        {
          img: '/pepekingprawn.jpg',
          podcastTitle: 'podcast',
          episodeTitle: 'episode3',
        },
      ]
    },
    {
      name: "podcasts",
      type: "user",
      images: [
        {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast1',
        episodeTitle: ''
      },
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast2',
        episodeTitle: ''
      },
      {
        img: '/pepekingprawn.jpg',
        podcastTitle: 'podcast1',
        episodeTitle: '',
      },
    ]
    },
    {
      name: "episodes",
      type: "user",
      images: [
        {
          img: '/pepekingprawn.jpg',
          podcastTitle: 'podcast3',
          episodeTitle: '',
        },
        {
          img: '/pepekingprawn.jpg',
          podcastTitle: 'podcast',
          episodeTitle: 'episode5',
        },
        {
          img: '/pepekingprawn.jpg',
          podcastTitle: 'podcast',
          episodeTitle: 'episode6',
        },
      ]
    },
]

//Styling
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ListsHighlight(props) {
  return (
    <Box>
      <Stack spacing={2}>
          {lists.map((item) =>(
            <Item key={item.name} >
              <ListPreview listName={item.name} type={item.type} images={item.images} listSize={props.listSize}/>
            </Item>
          ))}
        </Stack>
    </Box>
  );
}

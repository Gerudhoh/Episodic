import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

//Custom Components
import ActivityCard from "./ActivityCard.js";
import ListPreview from "./ListPreview.js";

const lists = [
    {
      name: "list1",
      type: "user",
      images: [
        {
          img: '/pepekingprawn.jpg',
          title: 'Breakfast',
        },
        {
          img: '/pepekingprawn.jpg',
          title: 'Burger',
        },
        {
          img: '/pepekingprawn.jpg',
          title: 'Camera',
        },
      ]
    },
    {
      name: "list2",
      type: "user",
      images: [
        {
        img: '/pepekingprawn.jpg',
        title: 'Hats'
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'Honey'
      },
      {
        img: '/pepekingprawn.jpg',
        title: 'Basketball',
      },
    ]
    },
    {
      name: "list3",
      type: "user",
      images: [
        {
          img: '/pepekingprawn.jpg',
          title: 'Fern',
        },
        {
          img: '/pepekingprawn.jpg',
          title: 'Mushrooms',
        },
        {
          img: '/pepekingprawn.jpg',
          title: 'Tomato basil',
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

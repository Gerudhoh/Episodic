import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

//Custom Components
import ActivityCard from "./ActivityCard.js";

const friends = [
    {
      name: "name1",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "",
      }
    },

    {
      name: "name2",
      activityType: "newList",
      activityInfo: {
          listName: "list1",
          images: [
            {
              img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
              title: 'Breakfast',
            },
            {
              img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
              title: 'Burger',
            },
            {
              img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
              title: 'Camera',
            },
          ]
        }
    },
    {
      name: "name3",
      activityType: "newList",
      activityInfo: {
        listName: "list1",
        images: [
          {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Breakfast',
          },
          {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Burger',
          },
          {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Camera',
          },
        ]
      }
    },
    {
      name: "name4",
      activityType: "listMove",
      activityInfo: {
        listName: "list1",
        images: [
          {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Breakfast',
          },
          {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Burger',
          },
          {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Camera',
          },
        ]
      }
    },
]



export default function FriendActivity(props) {
  return (
    <Box>
      <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
      {friends.map((item) => (
        <ActivityCard key={item.name} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.name} activitySize={props.activitySize}/>
      ))}
      </Stack>

    </Box>
  );
}

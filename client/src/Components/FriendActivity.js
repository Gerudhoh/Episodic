import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
        }
    },
    {
      name: "name3",
      activityType: "newList",
      activityInfo: {
        listName: "list1",
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
      }
    },
    {
      name: "name4",
      activityType: "listMove",
      activityInfo: {
        listName: "list1",
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
      }
    },
]



export default function FriendActivity(props) {
  return (
    <Box>
      <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
      {friends.map((item) => (
        <ActivityCard key={item.name} activityInfo={item.activityInfo} activityType={item.activityType} userName={item.name} userId={props.userId} activitySize={props.activitySize}/>
      ))}
      </Stack>

    </Box>
  );
}

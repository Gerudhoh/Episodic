import * as React from 'react';

//Material UI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

//Custom Components
import ActivityCard from "./ActivityCard.js";

const reviews = [
    {
      name: "name1",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },

    {
      name: "name2",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
    {
      name: "name3",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
    {
      name: "name4",
      activityType: "newReview",
      activityInfo: {
        rating: 5,
        date: "Feb 22 2022",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
]

export default function UserReviews() {

  return (
    <Box container sx={{maxWidth:"90%"}}>
      <Typography>Friend Activity</Typography>
      <Stack flexWrap="wrap" spacing={2} divider={<Divider orientation="horizontal" flexItem />} sx={{maxWidth:"100%"}}>
      {reviews.map((item) => (
        <ActivityCard key={item.name} activityType={item.activityType} userName={item.name} activityInfo={item.activityInfo} activitySize="large"/>
      ))}
      </Stack>

    </Box>
  );
}

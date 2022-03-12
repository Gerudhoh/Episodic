import * as React from 'react';

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

//Material UI Icons and Styling
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupsIcon from '@mui/icons-material/Groups';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CriticAchievement(){
  return(
    <Stack direction="row" spacing={2}>
      <RateReviewIcon aria-label="Rate Review"/>
      <Typography variant="p">Critic</Typography>
    </Stack>
  );
}

function SocialButterflyAchievement(){
  return(
    <Stack direction="row" spacing={2}>
      <GroupsIcon aria-label="Groups"/>
      <Typography variant="p">Social Butterfly</Typography>
    </Stack>
  );
}

function OrganizerAchievement(){
  return(
    <Stack direction="row" spacing={2}>
      <FactCheckIcon aria-label="Fact Check" />
      <Typography variant="p">Organizer</Typography>
    </Stack>
  );
}

function CloserAchievement(){
  return(
    <Stack direction="row" spacing={2}>
      <CheckCircleIcon aria-label="Check Circle" />
      <Typography variant="p">Closer</Typography>
    </Stack>
  );
}



export default function Achievement(props){
  switch (props.achievement) {
    case 'closer':
      return(CloserAchievement())
      break;
    case 'socialbutterfly':
      return(SocialButterflyAchievement())
      break;
    case 'organizer':
      return(OrganizerAchievement())
      break;
    case 'critic':
      return(CriticAchievement())
      break;
  }
  return(
    <React.Fragment />
  );
}

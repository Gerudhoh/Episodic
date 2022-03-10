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
  },
  {
    name: "list2",
    images: [
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats'
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey'
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
      },
    ]
  },
  {
    name: "list3",
    images: [
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
      },
      {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
      },
      {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
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

class ListsHighlight extends React.Component {

  constructor(props) {
    super(props);
    this.size = this.props.listSize;

    this.state = {
      allLists: []
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  getUserLists = async e => {
    //e.preventDefault();
    const response = await fetch("/api/v1/lists/get/all/temp");
    const body = await response.json();
    let listNames = [];
    body.lists.map((list) => {
      let tmp = { name: list.name, images: [] };
      // Add podcasts/episodes as images if there are any
      // I'm not entirely sure how to do this. We need the podcasts to be clickable (?) but they are just images + titles here
      listNames.push({ name: list.name })
    });
    this.setState({ allLists: listNames });
  };

  render() {
    return (
      <Box>
        <Typography>Lists</Typography>
        <Stack spacing={2}>
          {this.state.allLists.map((item) => (
            <Item key={item.name}>
              <ListPreview listName={item.name} images={item.images} listSize={this.size} />
            </Item>
          ))}
        </Stack>
      </Box>
    );
  }
}
export default ListsHighlight;
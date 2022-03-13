//Packages
import * as React from 'react';

//Material UI Components
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';

//Material UI Icons and Styling
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

//Styling
const episodeCardStyles = {
  small:
  {
    minSize: 100,
    buttonSize: "inherit",
    fontSize: 14,
    iconSize: { height: '15px', width: '15px' }
  },
  medium: {
    minSize: 160,
    buttonSize: "inherit",
    fontSize: 16,
    iconSize: { height: '25px', width: '25px' }
  },
  large: {
    minSize: 180,
    buttonSize: "inherit",
    fontSize: 20,
    iconSize: { height: '25px', width: '25px' }
  }
};

class EpisodeCard extends React.Component {

  constructor(props) {
    super(props);
    this.size = this.props.listSize;
    this.imgSize = this.size?.minSize - 20 || 100;
    this.img = this.props.img;
    this.id = this.props.id;
    this.title = this.props.title;

    this.state = {
      listView: this.props.listView || false,
      lists: [],
      listMenuItems: null,
      showSuccess: false
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  addPodcastToList = async e => {
    e.preventDefault();
    const response = await fetch('/api/v1/lists/add/podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: this.state.lists[e.target.value], podcastId: this.id}),
    });
    const body = await response.json();
    this.setState({showSuccess : body.success});
    window.location.reload(false);

  };
  
  getUserLists = async e => {
    //e.preventDefault();
    const response = await fetch("/api/v1/lists/get/all");
    const body = await response.json();
    let listNames = [];
    body.lists.map((list, index) => 
      listNames.push((<MenuItem key={index} value={index}>{list.name}</MenuItem>))
    );
    this.setState({ listMenuItems: listNames });
    this.setState({ lists:  body.lists });
  };

  render() {
    return (

      <Stack spacing={1}>
        <img
          src={`${this.img}?w=${this.imgSize}&h=${this.imgSize}&fit=crop&auto=format`}
          alt={this.title}
          loading="lazy"
        />
        {this.state.showSuccess ? (<Alert severity="success">
          Successfully added to list!
        </Alert>) : (null)}
        {!this.state.listView ? (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Add to List</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            /*value={this.state.selectedList}*/
            label="Age"
            onChange={this.addPodcastToList}
          >
            {this.state.listMenuItems}
          </Select>
        </FormControl>
        ) : (null)}
      </Stack>
    );
  }
}

export default EpisodeCard;
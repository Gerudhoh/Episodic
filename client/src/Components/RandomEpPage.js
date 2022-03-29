//Packages
import * as React from 'react';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

//Material UI Components
import CircularProgress from '@mui/material/CircularProgress';


//Custom Components
import EpisodeInfo from './EpisodeInfo.js';

export default function RandomEpPage(props){
  console.log(props);
  const [value, setValue] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();

  async function getRandomEpisode(data) {
    console.log(data);
    const response = await fetch('/api/v1/randomep', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response.json().then(response => {
      console.log(response);
      let epPod = response.pod;
      let podEpisodes = response.eps;
      let episode = response.episode;
      let explicit = episode.explicit === 0 ? "clean" : "explicit";
      let info = {
        title : episode.title,
        description : episode.description,
        date: episode.datePublishedPretty,
        audio : episode.enclosureUrl,
        language : episode.feedLanguage,
        explicit : explicit,
        podcast: {
          title : epPod.title,
          description : epPod.description,
          rss : epPod.rss,
          image : epPod.image,
          website : epPod.url,
          publisher : epPod.author,
          language : epPod.language,
          explicit : explicit,
          genre : epPod.categories,
          episodes : podEpisodes,
        }
      }
      return <EpisodeInfo episode={info} userId={props.userId}/>
    }).then( resource => {
      setValue(resource);
      setLoading(false);

    });
  };

  useEffect(() => {
    getRandomEpisode(location.state);
  }, [location.state]);

  return(
    <React.Fragment>
    {isLoading ? (
        <CircularProgress />
      ) : (
        value
      )}
    </React.Fragment>
  );
}

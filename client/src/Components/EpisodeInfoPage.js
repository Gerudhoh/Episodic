//Packages
import * as React from 'react';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//Material UI Components
import CircularProgress from '@mui/material/CircularProgress';

//Custom Components
import EpisodeInfo from './EpisodeInfo.js';

export default function EpisodeInfoPage(props) {
  const [value, setValue] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation()
  const podTitle = decodeURIComponent(location.pathname.split('/')[2]);
  const episodeTitle = decodeURIComponent(location.pathname.split('/')[3]);

  async function getEpisodeFromPodcast(podTitle, epTitle) {
    console.log(`Fetch ${epTitle} from ${podTitle}`);
    const response = await fetch('/api/v1/get_episode_from_podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ podName: podTitle, epName: epTitle }),
    });
    response.json().then(async response => {
      console.log(response);
      let epPod = response.pod;
      let podEpisodes = response.eps;
      let episode = response.episode;
      let explicit = episode.explicit === 0 ? "clean" : "explicit";
      let info = {
        title: episode.title,
        description: episode.description,
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

      const ratingResponse = await fetch('/api/v1/rating/get/episode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: epTitle, podcastName: podTitle }),
      });

      ratingResponse.json().then(response => {
        let rating = response.rating;
        return <EpisodeInfo episode={info} userId={props.userId} rating={rating} />
      }).then(resource => {
        setValue(resource);
        setLoading(false);

      });
    });
  };

  useEffect(() => {
    getEpisodeFromPodcast(podTitle, episodeTitle, props.userId);
  }, [podTitle, episodeTitle, props.userId]);

  return (
    <React.Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        value
      )}
    </React.Fragment>
  );
}

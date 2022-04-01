import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

//Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import EpisodeCardList from './EpisodeCardList.js';

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })

export default function SingleListViewFn(props) {
    const [value, setValue] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [listObj, setListObj] = useState({});
    const [list, setList] = useState({});
    const location = useLocation();

    async function getUserList(randomNum)  {
      setLoading(true);
      setValue(null);
        await delay(500);
        const listName = decodeURIComponent(location.pathname.split('/')[2]);
        console.log(listName);
        const response = await fetch('/api/v1/lists/get/one', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: listName, id: props.userId }),
        });
        response.json().then( body => {
        setListObj(body.list);
        console.log(listObj);
        let tmp = { name: listObj.name, images: [] };
        console.log(tmp);
        listObj.podcasts?.map((podcast) => {
    
        tmp.images.push({
            img: podcast.image,
            podcastTitle: podcast.title,
            listView: true,
            id: podcast.listenNotesId,
            currentList: listObj
        });
    
        })
        body.list.episodes?.map((episode) => {
    
        tmp.images.push({
            img: episode.image,
            episodeTitle: episode.title,
            podcastTitle: episode.podcast,
            listView: true,
            currentList: listObj,
        });
        console.log(tmp);
        console.log(body.list);
    
        })
        setList(tmp);
        return  (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Typography variant="h4">{list.name}</Typography>
              </Stack>
              <Stack>
                <EpisodeCardList images={list.images} listSize={"large"} userId={props.userId} key={listName} listView={true} />
              </Stack>
            </Stack>
          )}).then( resource => {
            setValue(resource);
            setLoading(false);
            console.log(location.pathname);
            console.log(list);
            console.log(listObj);
          });
    };

    useEffect(() => {
        getUserList(props.seed).catch(console.error);
      }, [props.seed]);

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
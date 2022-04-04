import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function EditProfileForm(props) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="Username"
          label="Username"
          value={props.props.username}
          variant="filled"
        />
        <TextField
          id="Email"
          label="Email"
          value={props.props.email}
          variant="filled"
        />
        <TextField
          id="Password"
          label="Password"
          type="password"
          autoComplete={props.props.password}
          variant="filled"
        />
      </div>
      &nbsp;&nbsp;
      <Button variant="contained" style={{height: "35px"}}>Submit</Button>
    </Box>
  );
}

export default function EditProfilePage(props) {
    const location = useLocation();
  
    useEffect(() => {
    }, [location, props]);
  
    return (
        <EditProfileForm props={props}/>
    );
  }
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

export function EditProfileForm(props) {
  const [userName, setUserName] = React.useState(props.props.username);
  const [email, setEmail] = React.useState(props.props.email);
  const [password, setPassword] = React.useState("");
  const [id, setId] = React.useState(props.props.userId);

  console.log(props);

  function updateUsername(e) {
    setUserName(e.target.value);
  }
  
  function updateEmail(e) {
    setEmail(e.target.value);
  }
  
  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function updateUser() {
    const response = await fetch('/api/v1/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName, email: email, password: password, id: id }),
    });
    let user = await response.json();
    console.log(user);
  }

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
      <FormControl>
        <TextField
          id="Username"
          label="Username"
          value={userName}
          onChange={updateUsername}
          variant="filled"
        />
        <TextField
          id="Email"
          label="Email"
          value={email}
          onChange={updateEmail}
          variant="filled"
        />
        <TextField
          id="Password"
          label="Password"
          type="password"
          autoComplete={password}
          onChange={updatePassword}
          variant="filled"
        />
      </FormControl>
      </div>
      &nbsp;&nbsp;
      <Button variant="contained" style={{height: "35px"}} onClick={updateUser}>Submit</Button>
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
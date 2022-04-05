import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';

import ProfilePage from './ProfilePage';

export default function EditProfilePage(props) {
  const [userName, setUserName] = React.useState(props.username);
  const [email, setEmail] = React.useState(props.email);
  const [password, setPassword] = React.useState("");
  const [id, setId] = React.useState(props.userId);
  const [alert, setAlert] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();

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
    setAlert(null);
    const response = await fetch('/api/v1/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName, email: email, password: password, id: id }),
    });
    let res = await response.json();
    if(res.warning) {
      setAlert(
        <Alert severity="warning">
          Warning: No parameters have been changed.
        </Alert>
      );
    } else if (res.success) {
      var date = new Date();
      date.setTime(date.getTime()+(2*60*60*1000));
      var expires = date.toGMTString();
      
      document.cookie = `username=${userName}; expires=${expires};`;
      document.cookie = `email=${email}; expires=${expires};`;
      setSuccess(true);
      setAlert(
        <Alert severity="success"> 
          Successfully updated profile.
        </Alert>
      );
    }
    
  }

  if(success) {
    return (
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        {alert}
        <Button 
          variant="contained" 
          style={{height: "35px"}} 
          component={Link} 
          to={"/profile"}
          state={ {username: userName}}
        >
            Back to Profile
        </Button>
      </Box>
    );
  } else {
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
      {alert}
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
}
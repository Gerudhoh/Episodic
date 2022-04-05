import * as React from 'react';
import { useNavigate, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import {checkAuth, logOut, getCookieData} from "../lib/CookieData.js"


//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    this.props.getUserFriends();
    this.props.getUserActivity();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    this.props.getUserFriends();
    this.props.getUserActivity();
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(215, 192, 173, 0.25)',
    '&:hover': {
      backgroundColor: 'rgba(215, 192, 173, 0.25)',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    color: '#d7c0ad'
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#d7c0ad'
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));

    const navigate = useNavigate();

    const fetchData = async (data) => {
      navigate('/searchresults', { state: data })
    };

    const fetchRandomEp = async () => {
      let num = Math.random();
      navigate('/randomep', { state: num })
    };

    const logOutUser = async (data) => {
      let authData = getCookieData();
      console.log(authData);
  
      if(authData.username !== undefined || authData.token !== undefined) {
        let response = await logOut(authData.username, authData.token);
        props.removeAuth();
        navigate('/login')
        window.scrollTo(0, 0);
        document.cookie = undefined;
        window.location.reload();
  
        if(response.error !== undefined) {
          //console.log(response.error);
        }
      }
    }
  
  const loginPage = async (data) => {
    props.removeAuth();
    navigate('/login')
    window.scrollTo(0, 0);
    window.location.reload();
  };
  


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            EPISODIC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem component={Link} to="/" replace onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/trending" replace onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Trending</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/randomep" replace onClick={fetchRandomEp}>
                  <Typography textAlign="center">Get Random Episode</Typography>
                </MenuItem>

                {props.auth === true &&
                  <MenuItem component={Link} to="/profile" replace onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                }
            </Menu>
          </Box>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            EPISODIC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component={Link} to="/" replace
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button component={Link} to="/trending" replace
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Trending
              </Button>
              <Button
                onClick={fetchRandomEp}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Get Random Episode
              </Button>
              {props.auth === true &&
                <Button component={Link} to="/profile" replace
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Profile
                </Button>
              }
          </Box>

          <Box sx={{padding:'10px'}}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    fetchData(event.target.value)
                  }
                }}
              />
          </Search>
        </Box>

        {props.auth === true &&
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={props.username} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu} component={Link} to={"/profile"}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logOutUser}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        }

        {props.auth === false &&
        <div>
        <Button variant="text" color="secondary"  onClick={loginPage}>Login</Button>
      </div>
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

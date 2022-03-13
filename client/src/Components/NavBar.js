import * as React from 'react';

//Material UI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


//Material UI Icons and Styles
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import {logOut, getCookieData} from "../lib/CookieData.js"
import history from './history';


const pages = ['Profile', 'Account', 'Dashboard', ];
const settings = ['Profile', 'Logout'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


class ResponsiveAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      showMenu: false,
      anchorElUser: null,
      setAnchorElUser: null
    };

    this.logOut = this.logOut.bind(this);

    this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this);
    this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
    this.loginPage = this.loginPage.bind(this);
  }

  async logOut() {
    this.closeMenu();
    let authData = getCookieData();
    console.log(authData);

    if(authData.username === undefined || authData.token === undefined) {
      let response = await logOut(authData.username, authData.token);
      this.props.removeAuth();
      await history.push("/login");
      window.scrollTo(0, 0);
      window.location.reload();

      if(response.error !== undefined) {
        //console.log(response.error);
      }
    }
  }

  async loginPage() {
    this.props.removeAuth();
    await history.push("/login");
    window.scrollTo(0, 0);
    window.location.reload();
  };

  handleOpenNavMenu = (event) => {
    this.setState({ showMenu: event.currentTarget});
  };

  handleOpenUserMenu = (event) => {
    this.setState({setAnchorElUser: event.currentTarget});
  };

  handleCloseNavMenu = () => {
    this.setState({ showMenu: null});
  };

  handleCloseUserMenu = () => {
    this.setState({setAnchorElUser: null});
  };

  render() {
    return (
      <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                LOGO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.menuOpen}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(this.state.menuOpen)}
                  onClose={this.handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={this.handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={this.handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              {this.props.auth === true &&
              <div>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={this.state.anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(this.state.anchorElUser)}
                  onClose={this.handleCloseUserMenu}
                >
                  
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              </div>
              }

              {this.props.auth === false &&
              <div>
                <Button variant="text" color="secondary"  onClick={this.loginPage}>Login</Button>
              </div>
              }
            </Toolbar>
          </Container>
      </AppBar>
    );
  }
};

export default ResponsiveAppBar;

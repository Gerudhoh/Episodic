import * as React from 'react';

//Material UI Icons and Styles
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
import {logOut, getCookieData} from "../lib/CookieData.js"
import history from './history';
import { Link, Router } from "react-router-dom";

//Material UI Icons and Styling
import { styled } from '@mui/material/styles';

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


  const pages = [
    {display:'Home', to:'/'},
    {display:'Search', to:'/searchresults'},
    {display:'Profile', to:'/profile'},
    {display:'TestPodInfo', to:'/info/Getting%20Literate'}
  ];
  const settings = ['Profile', 'Logout'];


class ResponsiveAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      showMenu: false,
      userMenuOpen: false,
      userShowMenu: false,
      username: ""
    };

    this.logOut = this.logOut.bind(this);

    this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this);
    this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
    this.loginPage = this.loginPage.bind(this);
    this.checkAuthData = this.checkAuthData.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.checkAuthData();
  }

  async checkAuthData() {
    let authData = getCookieData();
    this.setState({username: authData.username});
  }

  async logOut() {
    this.closeMenu();
    let authData = getCookieData();
    console.log(authData);

    this.setState({username: authData.username});

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

  async redirect(route, data) {
    await history.push(route, { state: data });
    window.scrollTo(0, 0);
    window.location.reload();
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
    this.setState({userShowMenu: event.currentTarget});
  };

  handleCloseNavMenu = () => {
    this.setState({ showMenu: null});
  };

  handleCloseUserMenu = () => {
    this.setState({userShowMenu: null});
  };

  render() {
    return (
      <Router>
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
                <MenuItem key={page.display} replace onClick={this.handleCloseNavMenu}>
                  <Link to={page.to}>
                  <Typography textAlign="center">{page.display}</Typography>
                  </Link>
                </MenuItem>
              ))}
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
            {pages.map((page) => (
              <Button replace
                key={page.display}
                onClick={this.handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.to}>
                  {page.display}
                </Link>
              </Button>
            ))}
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
                    this.redirect("/searchresults", event.target.value)
                  }
                }}
              />
          </Search>
        </Box>

        {this.props.auth === true &&
          <div>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={this.state.username} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={this.state.userShowMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(this.state.userShowMenu)}
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
      </Router>
    );
  }
};

export default ResponsiveAppBar;

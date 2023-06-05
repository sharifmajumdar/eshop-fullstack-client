import { useState } from 'react';
import { Link, AppBar, Box, Container, Toolbar, Tooltip, Button, IconButton, Typography, Menu, MenuItem, Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAppSelector } from '../../app/hooks';
import { getMemoizedNumItems } from '../../features/Cart/cartSlice';

const pages = [
  {
      id: 1,
      name: 'Home',
      link: '/'
  },
  {
      id: 2,
      name: 'History',
      link: 'history'
  },
  {
      id: 3,
      name: 'Admin',
      link: 'admin'
  },
  {
      id: 4,
      name: 'Deals',
      link: 'deals'
  },
  {
      id: 5,
      name: 'Contact',
      link: 'contact'
  }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [ isLogin, setIsLogin] = useState<null | boolean>(false);
  const navigate = useNavigate();
  const numItems = useAppSelector(getMemoizedNumItems);
  const email = useAppSelector((state) => state.login.email);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClicked = () => {
    navigate('/login');
  }

  return (
    <AppBar position="absolute" sx={{ backgroundColor: "success.light"}}>
      <Container>
        <Toolbar disableGutters>
          <StoreOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap            
            component={RouterLink} to="/" 
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            eSHOP
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
              {pages.map(({ id, name, link}) => (
                <MenuItem key={id} onClick={handleCloseNavMenu}>
                  <Link component={RouterLink} to={ link } color="inherit">
                    <Typography textAlign="center">{name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StoreOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink} to="/"         
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            eSHOP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ id, name, link }) => (
              <Button
                key={id}
                component={RouterLink} to={ link }
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {name}              
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link component={RouterLink} to="/cart">
              <Button>
                <AddShoppingCartIcon />
                <Typography>{numItems && numItems}</Typography>
              </Button>              
            </Link>            
            {
                isLogin ? 
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip> :
                <Button onClick={handleClicked} variant="contained" sx={{ color: 'white', bgcolor: 'gray' }}>Login</Button>
            }
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
              {settings.map((setting) => (
                <MenuItem  key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

const PAGES = [
  { label: 'Home', destination: '/' },
  { label: 'Buses', destination: '/Buses' },
  { label: 'Trains', destination: '/Trains' },
  { label: 'Account', destination: '/Users' },
  { label: 'Sign-up / Login', destination: '/Signup-Login' },
  { label: 'Info', destination: '/Info'},
  { label: 'User', destination: '/User'},


];

const navLinkStyle = {
  marginRight: '1rem', // Adjust spacing between links
  color: 'inherit', // Inherit text color from parent
  textDecoration: 'none', // Remove default underline
  fontSize: '1.8rem', // Larger font size
  fontFamily: "Bebas Neue",
  display: 'inline-block', // Display links horizontally
  marginTop: '15px', // Move down by 15px
  padding: '8px 16px', // Increase padding to make the button bigger
  borderRadius: '8px', // Make the rectangle slightly rounded
  transition: 'background-color 0.3s', // Smooth transition for background color change
};

const appBarStyle = {
  height: '90px', // Set height to 90px
  backgroundColor: '#0f3479', // Set background color
  borderRadius: '0 0 10px 10px',
  position: 'fixed', // Fix position
  width: '100%', // Take full width of the viewport
  top: 0, // Position at the top
  //zIndex: 1000 // Ensure it's above other content
};

function Navbar() {
  const handleHover = (event) => {
    event.target.style.backgroundColor = '#adcae6'; // Gray background color on hover
  };

  const handleLeave = (event) => {
    event.target.style.backgroundColor = 'transparent'; // Revert to transparent background color on leave
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar>
        <Typography variant="h6" component="div" style={{ fontFamily: "Bebas Neue", flexGrow: 1, fontSize: '2.2rem', marginTop: '15px' }}>
           JALT Routes
        </Typography>
        <nav>
          {PAGES.map((page) => (
            <Link
              key={page.destination}
              href={page.destination}
              style={navLinkStyle}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

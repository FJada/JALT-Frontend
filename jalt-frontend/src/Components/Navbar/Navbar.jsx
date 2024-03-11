import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

const PAGES = [
  { label: 'Home', destination: '/Home' },
  { label: 'Map', destination: '/Map' },
  { label: 'Buses', destination: '/Buses' },
  { label: 'Trains', destination: '/Trains' },
  { label: 'Account', destination: '/Users' },
  { label: 'Log-in', destination: '/Log-in' }
];

const navLinkStyle = {
  marginRight: '1rem', // Adjust spacing between links
  color: 'inherit', // Inherit text color from parent
  textDecoration: 'none', // Remove default underline
};

function NavLink({ page }) {
  const { label, destination } = page;
  return (
    <Link href={destination} style={navLinkStyle}>
      {label}
    </Link>
  );
}

NavLink.propTypes = {
  page: PropTypes.shape({
    label: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
  }).isRequired,
};

function Navbar() {
  return (
    <AppBar position="static" style={{ height: '90px' }}> {/* Adjust height here */}
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Navbar
        </Typography>
        <nav>
          {PAGES.map((page) => (
            <NavLink key={page.destination} page={page} />
          ))}
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

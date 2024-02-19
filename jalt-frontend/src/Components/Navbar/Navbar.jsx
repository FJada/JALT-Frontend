import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './navbar.css';

const PAGES = [
  { label: 'Home', destination: '/' },
  {label:'Buses', destination:'/Buses'},
  { label: 'Trains', destination: '/Trains' },
  { label: 'Account', destination: '/Users' },
  { label: 'Log-in', destination: '/Log-in' }


];

function NavLink({ page }) {
  const { label, destination } = page;
  return (
    <li>
      <Link to={destination}>{label}</Link>
    </li>
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
    <nav className="navbar">
      <ul className="nav-links">
        {PAGES.map((page) => <NavLink key={page.destination} page={page} />)}
      </ul>
    </nav>
  );
}

export default Navbar;

import React, {useState, useEffect} from 'react';
import classes from '../../global.module.css'
import axios from 'axios';


import mapboxgl from 'mapbox-gl';

const Map = () => {
  const mapboxToken = 'pk.eyJ1IjoiamFsdHN3ZSIsImEiOiJjbHQyZTIwOGowc2VvMmxxeGsyaWFlamsyIn0._BSsOblV0A4_Rvhzz1Av4w';

  React.useEffect(() => {
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [-74.006, 40.7128], 
      zoom: 12, 

    });

    return () => {
      map.remove(); 
    };
  }, [mapboxToken]);

  return (
    <div id="map" style={{ width: '60%', height: '900px', margin: 'auto' }} />
  );
};

export default Map;

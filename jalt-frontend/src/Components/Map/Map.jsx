import React, {useState, useEffect} from 'react';
import classes from '../../global.module.css'
import axios from 'axios';
import trainlines from './../Data/subway-lines-ver2.json'


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

    map.on('style.load', () => {
      map.addSource('subway-lines', {
        type: 'geojson',
        data: trainlines,
      });

      map.addLayer({
        id: 'subway-lines-layer',
        type: 'line',
        source: 'subway-lines',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2,
        },
      });
    });



    return () => {
      map.remove(); 
    };
  }, [mapboxToken]);

  return (
    <div>
    <div className={classes.title}> Welcome to JALT Routes </div>

    <div id="map" style={{ width: '60%', height: '900px', margin: 'auto' }} />
    </div>
  );
};

export default Map;

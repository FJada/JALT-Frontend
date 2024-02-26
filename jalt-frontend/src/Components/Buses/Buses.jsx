import React, {useState, useEffect} from 'react';
import classes from '../../global.module.css'
import axios from 'axios';

function Buses({busName}) {
  const [error, setError] = useState('Below is our list of buses fetched from our API Server:');
  const [buses, setBuses] = useState([]);
  
  useEffect(
    () => {
      axios.get('http://127.0.0.1:8000/buses')
      .then((response)=>{
        const busesObject = response.data.Data;
        const keys = Object.keys(busesObject);
        const busesArray = keys.map((key) => busesObject[key]);
        setBuses(busesArray);
      }) // retrieves buses
      .catch(() =>{setError('Something went wrong'); });

    },
    [],
  );
  return (
    <div className={classes.text}>
      <div className={classes.title}> <h>Buses</h></div>
    
      {error && (<div className='error-message'>
        {error}
        </div> 
        )}
      {buses.map((bus) => (
        <div className='bus-container'>
          <h2>{bus.busName}</h2>
          </div>

      ))}
      
    </div>
  );
}

export default Buses;


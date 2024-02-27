import React, {useState, useEffect} from 'react';
import classes from '../../global.module.css'
import axios from 'axios';

function Notification({ message }) {
  return (
    <div className={classes.notification}>
      {message}
    </div>
  );
}


function Buses({busName}) {

  const [error, setError] = useState('Below is our list of buses fetched from our API Server:');
  const [buses, setBuses] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const fetchBuses = () => {
    axios.get('http://127.0.0.1:8000/buses')
      .then((response) => {
        const busesObject = response.data.Data;
        const keys = Object.keys(busesObject);
        const busesArray = keys.map((key) => busesObject[key]);
        setBuses(busesArray);
        setShowNotification(true); // Show notification on success
        setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds

      })
      .catch(() => { setError('Something went wrong');
      setShowNotification(false); // Hide notification on error
    });
  };


  return (
    <div className={classes.text}>
      <div className={classes.title}> <h>Buses</h></div>

      <button onClick={fetchBuses}>Fetch Buses</button>

      {error && (<div className='error-message'>
        {error}
        </div> 
        )}

{showNotification && <Notification message="Buses successfully fetched." />}

      {buses.map((bus) => (
        <div className='bus-container'>
          <h2>{bus.busName}</h2>
          </div>

      ))}
      
    </div>
  );
}

export default Buses;

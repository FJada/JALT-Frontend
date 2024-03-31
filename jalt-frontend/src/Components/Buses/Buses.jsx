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
  const [isLoading, setIsLoading] = useState(false);
  const [newBusData, setNewBusData] = useState({
    bus_name: '',
    vehicle_id: '',
    favorite: false,
  });

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

  const addBus = () => {
    setIsLoading(true);
    axios.post('http://127.0.0.1:8000/buses/add_bus', {
      bus_name: newBusData.bus_name,
      vehicle_id: newBusData.vehicle_id,
      favorite: newBusData.favorite,
    })
      .then(() => {
        // Once user is added successfully, fetch updated user list
        fetchBuses();
        setNewBusData({ bus_name: '', vehicle_id: '' , favorite: false});
      })
      .catch(() => {
        setError('Failed to add bus');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBusData({ ...newBusData, [name]: value });
  };

  const handleCancel = () => {
    setNewBusData({ bus_name: '', vehicle_id: '', favorite: false });
  };

  return (
    <div className={classes.text}>
      <div className={classes.title}> Add Bus Route </div>
      <div >
        <label>Bus Name:</label>
        <input
          type="text"
          name="bus_name"
          value={newBusData.bus_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Vehicle ID:</label>
        <input
          type="text"
          name="vehicle_id"
          value={newBusData.vehicle_id}
          onChange={handleInputChange}
        />
      </div>
      

      <button className={classes.btn} onClick={addBus} disabled={isLoading}>
        {isLoading ? 'Adding Bus...' : 'Add Bus'}
      </button>

      <button className={classes.btn} onClick={handleCancel}>Cancel</button>

      <div className={classes.title}> <h>All Buses</h></div>

      <button className={classes.btn} onClick={fetchBuses}>Fetch Buses</button>

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

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
  const [searchedBus, setSearchedBus] = useState('');
  const [newBusData, setNewBusData] = useState({
    bus_name: '',
    borough: '',
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
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
    });
  };

  const searchBus = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/buses/${searchedBus}`);
      if (response.data) {
        setBuses([response.data.Data]);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
      }
    } catch (error) {
      setError('Error searching for bus');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
    }    
  };

  const handleInputChangeBus = (event) => {
    setSearchedBus(event.target.value);
  };

  const addBus = () => {
    setIsLoading(true);
    axios.post('http://127.0.0.1:8000/buses/add_bus', {
      bus_name: newBusData.bus_name,
      borough: newBusData.borough,
      favorite: newBusData.favorite,
    })
      .then(() => {
        // Once user is added successfully, fetch updated user list
        fetchBuses();
        setNewBusData({ bus_name: '', borough: '' , favorite: false});
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
const clearBuses = () => {
    setBuses([]);
  };
  
  const handleCancel = () => {
    setNewBusData({ bus_name: '', borough: '', favorite: false });
  };

  const handleFavoriteChange = (event) => {
    const { name, checked } = event.target;
    setNewBusData({ ...newBusData, [name]: checked });
  };

  return (

    <div className={classes.text}>

<div className={classes.title}> <h>Buses</h></div>

<div className={classes.title}>Search for Buses</div>
<div>
        <label>Search By Bus Name:</label>
        <input
          type="text"
          value={searchedBus}
          onChange={handleInputChangeBus}
        />
        <button className={classes.btn} onClick={searchBus}>Search</button>
      </div>

<button className={classes.btn} onClick={fetchBuses}>See all Buses</button>
<button className={classes.btn} onClick={clearBuses}>Clear Buses </button>

{error && (<div className='error-message'>
  {error}
  </div> 
  )}

{showNotification && <Notification message="Buses successfully fetched." />}

{buses.map((bus) => (
  <div className='bus-container'>
    <h2>{bus.busName}</h2>
    {/* <span onClick={() => toggleFavorite(index)}>
      {bus.isFavorite ? '★' : '☆'} 
    </span> */}
  </div>

))}
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
        <label>Borough:</label>
        <input
          type="text"
          name="borough"
          value={newBusData.borough}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>
          Favorite:
          <input
            type="checkbox"
            name="favorite"
            checked={newBusData.favorite}
            onChange={handleFavoriteChange}
          />
        </label>
      </div>      

      <button className={classes.btn} onClick={addBus} disabled={isLoading}>
        {isLoading ? 'Adding Bus...' : 'Add Bus'}
      </button>

      <button className={classes.btn} onClick={handleCancel}>Cancel</button>

      

     
      
    </div>
  );
}

export default Buses;

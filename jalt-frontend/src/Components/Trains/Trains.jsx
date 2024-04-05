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

function Trains({trainName}) {

  const [error, setError] = useState('Below is our list of trains fetched from our API Server:');
  const [trains, setTrains] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newTrainData, setNewTrainData] = useState({
    train_name: '',
    vehicle_id: '',
    favorite: false,
  });

  const fetchTrains = () => {
    axios.get('http://127.0.0.1:8000/trains')
      .then((response) => {
        const trainsObject = response.data.Data;
        const keys = Object.keys(trainsObject);
        const trainsArray = keys.map((key) => trainsObject[key]);
        setTrains(trainsArray);
        setShowNotification(true); // Show notification on success
        setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds

      })
      .catch(() => { setError('Something went wrong');
      setShowNotification(false); // Hide notification on error
    });
  };

  const addTrain = () => {
    setIsLoading(true);
    axios.post('http://127.0.0.1:8000/trains/add_train', {
      train_name: newTrainData.train_name,
      vehicle_id: newTrainData.vehicle_id,
      favorite: newTrainData.favorite,
    })
      .then(() => {
        // Once user is added successfully, fetch updated user list
        fetchTrains();
        setNewTrainData({ train_name: '', vehicle_id: '' , favorite: false});
      })
      .catch(() => {
        setError('Failed to add train');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTrainData({ ...newTrainData, [name]: value });
  };
  const clearTrains = () => {
    setTrains([]);
  };

  const handleCancel = () => { //deletes any input when User inputs text on form 
    setNewTrainData({ bus_name: '', vehicle_id: '', favorite: false });
  };

  const handleFavoriteChange = (event) => { //adds favorite input into train data
    const { name, checked } = event.target;
    setNewTrainData({ ...newTrainData, [name]: checked });
  };

  return (
    <div className={classes.text}>
  <div className={classes.title}> <h>Trains</h></div>

  <button className={classes.btn} onClick={fetchTrains}>See all Trains</button>
  <button className={classes.btn} onClick={clearTrains}>Clear Trains</button>



  {error && (<div className='error-message'>
    {error}
    </div> 
    )}

  {showNotification && <Notification message="Trains successfully fetched." />}

  {trains.map((train) => (
    <div className='train-container'>
      <h2>{train.trainName}</h2>
      </div>

  ))}


      <div className={classes.title}> Add New Train Route </div>
      <div>
        <label>Train Name:</label>
        <input
          type="text"
          name="train_name"
          value={newTrainData.train_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Vehicle ID:</label>
        <input
          type="text"
          name="vehicle_id"
          value={newTrainData.vehicle_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>
          Favorite:
          <input
            type="checkbox"
            name="favorite"
            checked={newTrainData.favorite}
            onChange={handleFavoriteChange}
          />
        </label>
      </div>

      <button className={classes.btn} onClick={addTrain} disabled={isLoading}>
        {isLoading ? 'Adding Train...' : 'Add Train'}
      </button>

      <button className={classes.btn} onClick={handleCancel}>Cancel</button>

    
    </div>
  );
}

export default Trains;
import React, {useState, useEffect} from 'react';
import classes from '../../global.module.css'
import axios from 'axios';

function Info(){
    // Define any additional logic or state if needed
    return (
        <div className={classes.title}>
          <p>Info Page</p>
          <p>This is the info page.</p>
        </div>
      );
    
  };

  
  
  export default Info;
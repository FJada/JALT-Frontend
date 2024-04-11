import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from '../../global.module.css';

function Info() {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    // Fetch form data from the backend when the component mounts
    axios.get('http://127.0.0.1:8000/form')
      .then(response => {
        setFormFields(response.data.fields);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    // Add your logic to handle form submission
  };

  // Function to convert form fields to initial form answers
  const fieldsToAnswers = (fields) => {
    const answers = {};
    fields.forEach(({ fld_nm }) => { answers[fld_nm] = ''; });
    return answers;
  };

  // Render the form fields dynamically
  const formElements = formFields.map(field => (
    <div key={field.fld_nm}>
      <label>{field.question}</label>
      {!field.instructions && (
        <select 
          name={field.fld_nm} 
          onChange={(e) => handleInputChange(field.fld_nm, e.target.value)}
        >
          {field.choices.map(choice => (
            <option key={choice} value={choice}>{choice}</option>
          ))}
        </select>
      )}
    </div>
  ));

  // Function to handle input change
  const handleInputChange = (fieldName, value) => {
    // Handle input change logic here
  };

  // Function to handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log('Form submitted:', data);
    // Handle form submission logic here
  };

  return (
    <div className={classes.title}>
      <p>Info Page</p>
    
      <p>Select train information by train line.</p>
      {/* Render the form */}
      <form onSubmit={handleFormSubmit}>
        {formElements}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Info;

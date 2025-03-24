import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { format } from "date-fns";
import "../App.css";

export default function Dramas() {
  const [dramaName, setDramaName] = useState("");
  const [launchDate, setLaunchDate] = useState(null);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const showIconProps = { showIcon: false };
  const handleDramaNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/; // Allows alphabets, numbers, and spaces
    if (regex.test(value)) {
      setDramaName(value);
      setError(""); // Clear error if input is valid
    } else {
      setError("Drama name can only contain alphanumeric and spaces.");
    }
  };
  const handleDateChange = (e) => {
    const value = e.target.value || e.value; // Handle both typed and selected values
    const isValidDate = value instanceof Date && !isNaN(value.getTime()); // Check if it's a valid Date object

    if (isValidDate) {
      setLaunchDate(value);
      setDateError(""); // Clear error if a valid date is selected
    } else if (typeof value === "string" && value.trim() !== "") {
      // If the user types, validate the string as a date
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setLaunchDate(parsedDate);
        setDateError(""); // Clear error if the typed date is valid
      } else {
        setDateError("Please enter a valid date.");
      }
    } else {
      setLaunchDate(null);
      setDateError("Please select or enter a valid date.");
    }
  };

  const handleSubmit = ()=>{
    if(dramaName && launchDate){
        const formattedDate = format(launchDate, "MM/dd/yy");
      alert(`Drama Name: ${dramaName}\nLaunch Date: ${formattedDate}`);
    } else {
      setError("Please enter valid drama name.");
      setDateError("Please select valid launch date.");
    }
  }

  return (
    <div>
      <h1>Dramas</h1>
      <p>List of dramas will be displayed here.</p>
      <div className="grid">
        <div className="col-2">
        <label>
                    Name <span style={{ color: 'red' }}>*</span>
        </label>
        <InputText
            placeholder="drama name" 
            value={dramaName} 
            onChange={handleDramaNameChange} 
        />
         {error && <small style={{ color: "red", display: "block", marginTop: "5px" }}>{error}</small>}
         </div>
         <div className="col-2">
         <label  className="label">
                    Launch Date <span style={{ color: 'red' }}>*</span>
          </label>
            <Calendar  
                placeholder="launch date" 
                value={launchDate} 
                onChange={handleDateChange} 
                //{ ...(true && showIconProps)}
                { ...(true && {showIcon: true})}
                dateFormat="mm/dd/yy"
            />
            {dateError && (
              <small style={{ color: "red", display: "block", marginTop: "5px" }}>
                {dateError}
              </small>
            )}
        </div>
      </div>
      <div className="col-4">
        <Button label="Submit" severity="success" onClick={handleSubmit} />
        </div>
    </div>
  );
}

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import GenerateDrugsPage from './pages/GenerateDrugsPage'; // Import your GenerateDrugsPage

function App() { //defining the 'App' component which is the root component of the react application
  const [showButtons, setShowButtons] = useState(true); // using 'useState' hook to define a state variable 'showButtons' and a function 'setShowButtons' to control whether the buttons are shown or not
  const [showDropdown, setShowDropdown] = useState(true)

  const onGenerateDrugsClick = () => { // defining the 'onGenerateDrugsClick'  function, which is intended to be called when the "Generate Drugs" button is clicked. It sets 'showButtons' to 'false' to hide buttons
    // Perform actions when Generate Drugs button is clicked
    setShowButtons(false); // Hide the buttons
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<HomePage showButtons={showButtons} setShowButtons={setShowButtons} onGenerateDrugsClick={onGenerateDrugsClick} />}/> {/*Rendering the homepage component passing in various props ('showButtons', 'setShowButtons', 'onGenerateClick') to it*/}
          <Route path="/generate-drugs" element={<GenerateDrugsPage />} />
        </Routes>
      </div>

    </Router>
 
  );
}

export default App;

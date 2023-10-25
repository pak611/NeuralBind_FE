import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/protein_render.png';
import logo from '../images/NB_Logo.png';
import './HomePage.css';


const homePageStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
};

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function HomePage({ showButtons, setShowButtons, onGenerateDrugsClick }) {
  const [showDropdown, setShowDropdown] = useState(false);

    // Add a state variable for the submission status
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Add state variables for docking button
  const [showDockingButton, setShowDockingButton] = useState(false);

  // Add state variable for docking messages
  const [message, setMessage] = useState("");

  // Add state variable for job_id (progress bar)
  const [jobId, setJobId] = useState(null);



  console.log('showDockingButton state:', showDockingButton)



  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleSubmit = async (event) => {
    console.log('handleSubmit triggered')
    event.preventDefault();
  
    // Get form field values
    const xRangeValue = event.target.x_range.value;
    const yRangeValue = event.target.y_range.value;
    const zRangeValue = event.target.z_range.value;
    const file = event.target.file.files[0]; // Get the uploaded file

  // Create FormData object
  const formData = new FormData();
  formData.append('x_range', xRangeValue);
  formData.append('y_range', yRangeValue);
  formData.append('z_range', zRangeValue);
  formData.append('file', file);

  try {
    console.log("Making fetch request to http://127.0.0.1:8000/api/submit/");
    const csrftoken = getCookie('csrftoken');
    const response = await fetch('http://127.0.0.1:8000/api/submit/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken,
      },
      body: formData,
    });
    console.log("Fetch request completed");

    console.log("Raw fetch response:", response);



 
    
    const responseData = await response.json();

    if(responseData.job_id) {
      setJobId(responseData.job_id);
    }
    if(responseData.message === "File cleaned successfully") {
      console.log('recieved file cleaned successfully message')
      setShowDockingButton(true);
    } else {
      console.error('Unexpected message:", responseData.message')
    }

    if (response.ok) {
      // Handle success, e.g., show a success message
      console.log('Form submitted successfully');
      setSubmissionStatus('Form submitted successfully');
    } else {
      // Handle error, e.g., show an error message
      console.error('Form submission failed');
      setSubmissionStatus('Form submission failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    setSubmissionStatus('An error occurred during submission');
  }
};

const runDockingStudy = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/api/run_docking/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ job_id: jobId })
      });

      const responseData = await response.json();

      if (responseData.success) {
          setMessage("Docking study completed successfully!");
      } else {
          setMessage("Error during docking study.");
      }
  } catch (error) {
      console.error("Error during API call:", error);
      setMessage("An error occurred during the docking study.");
  }
  };

    // Add an event listener to show/hide tooltips
    useEffect(() => {
      const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
  
      tooltipTriggers.forEach((trigger) => {
        trigger.addEventListener('mouseover', (event) => {
          const tooltip = event.target.nextElementSibling;
          tooltip.style.display = 'block';
        });
  
        trigger.addEventListener('mouseout', (event) => {
          const tooltip = event.target.nextElementSibling;
          tooltip.style.display = 'none';
        });
      });
    }, []);
  
    useEffect(() => {
      console.log("HomePage component re-rendered");
    });




  return (
    <div className="home-page" style={homePageStyle}>
      <nav className='nav-bar'>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      </nav>
   
     
      <div className="button-container">
        <div className="button-wrapper">
          <button
            className="home-button"
            onClick={() => {
              onGenerateDrugsClick();
              toggleDropdown();
            }}
          >
            Generate Drugs
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <form onSubmit={handleSubmit}>
              <div className="form-entry">
                <label className="scientific-input tooltip-trigger">
                  Upload .PDB File:
                  <input
                    type="file"
                    name="file"
                    accept=".txt"
                    className="tooltip-trigger" // Add this class
                  />
                  <div className="tooltip">
                    Upload a .PDB file.
                  </div>
                </label>
              </div>

                <div className="form-entry">
                  <label className="scientific-input tooltip-trigger">
                    X Range (Ordered Pair):
                    <input
                      type="text"
                      name="x_range"
                      placeholder="[xmin, xmax]"
                      pattern="\[\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\]"
                      title="Enter xmin and xmax values as an ordered pair, e.g. [-1.5, 5.0]"
                    />
                    <div className="tooltip">
                      Enter xmin and xmax values as an ordered pair, e.g. [-1.5, 5.0]
                    </div>
                  </label>
                </div>

                <div className="form-entry">
                  <label className="scientific-input tooltip-trigger">
                    Y Range (Ordered Pair):
                    <input
                      type="text"
                      name="y_range"
                      placeholder="[ymin, ymax]"
                      pattern="\[\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\]"
                      title="Enter ymin and ymax values as an ordered pair, e.g. [-1.5, 5.0]"
                    />
                    <div className="tooltip">
                      Enter ymin and ymax values as an ordered pair, e.g. [-1.5, 5.0]
                    </div>
                  </label>
                </div>
                <div className="form-entry">
                  <label className="scientific-input tooltip-trigger">
                    X Range (Ordered Pair):
                    <input
                      type="text"
                      name="z_range"
                      placeholder="[zmin, zmax]"
                      pattern="\[\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\]"
                      title="Enter zmin and zmax values as an ordered pair, e.g. [-1.5, 5.0]"
                    />
                    <div className="tooltip">
                      Enter zmin and zmax values as an ordered pair, e.g. [-1.5, 5.0]
                    </div>
                  </label>
                </div>
                <div className="form-entry">
                  <button 
                  type="submit">Submit</button>
                </div>
              </form>
              {submissionStatus && <p>{submissionStatus}</p>}
            </div>

          )}
        </div>
        {showButtons && (
          <>
            <button className="home-button">Find Targets</button>
            <button className="home-button">Build Pharmacophore</button>
          </>
        )}
       
      </div>
      <div className='docking-button-container'>
        {message && <p>{message}</p>}
        {showDockingButton && <button className="run-docking-button" onClick={runDockingStudy}>Run Docking Study</button>}
      </div>
      
    </div>
  );
}

export default HomePage;


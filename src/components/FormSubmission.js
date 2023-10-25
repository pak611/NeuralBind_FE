import React, { useState } from 'react';

function YourFormComponent() {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    textFile: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, textFile: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append('field1', formData.field1);
    form.append('field2', formData.field2);
    form.append('field3', formData.field3);
    form.append('text_file', formData.textFile);

    try {
      const response = await fetch('/api/form-data/', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        console.log('Form data submitted successfully');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="field1"
        value={formData.field1}
        onChange={handleInputChange}
      />
      {/* Add other input fields */}
      <input
        type="file"
        name="textFile"
        accept=".txt"
        onChange={handleFileChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default YourFormComponent;

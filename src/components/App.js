import React, { useState } from "react";
import '../styles/App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    phoneNumber: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Form validation
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      setError("All fields are mandatory.");
      return;
    }
    if (!/^[a-zA-Z0-9\s]*$/.test(formData.name)) {
      setError("Name is not alphanumeric.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Email must contain @.");
      return;
    }
    if (!["male", "female", "other"].includes(formData.gender)) {
      setError("Please identify as male, female or others.");
      return;
    }
    if (!/^\d+$/.test(formData.phoneNumber)) {
      setError("Phone Number must contain only numbers.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must contain at least 6 letters.");
      return;
    }

    // If all validation passes
    const username = formData.email.split("@")[0];
    setSuccessMessage(`Hello ${username}!`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div id="main">
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" data-testid="name" placeholder="Name" value={formData.name} onChange={handleChange} /><br />
        
        <label htmlFor="email">Email:</label>
        <input id="email" data-testid="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br />
        
        <label htmlFor="gender">Gender:</label>
        <select id="gender" data-testid="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select><br />
        
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input id="phoneNumber" data-testid="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} /><br />
        
        <label htmlFor="password">Password:</label>
        <input id="password" data-testid="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br />
        
        <button data-testid="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;

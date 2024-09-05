// src/components/CreateCustomer.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateCustomer.css'; // Optional CSS for styling

const CreateCustomer = () => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    addresses: [{ street: '', city: '', state: '', zip: '' }],
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...customerData.addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
    setCustomerData({ ...customerData, addresses: updatedAddresses });
  };

  const addNewAddress = () => {
    setCustomerData({
      ...customerData,
      addresses: [...customerData.addresses, { street: '', city: '', state: '', zip: '' }],
    });
  };

  const removeAddress = (index) => {
    const updatedAddresses = customerData.addresses.filter((_, i) => i !== index);
    setCustomerData({ ...customerData, addresses: updatedAddresses });
  };

  const validateForm = () => {
    const errors = {};
    if (!customerData.firstName.trim()) errors.firstName = 'First Name is required';
    if (!customerData.lastName.trim()) errors.lastName = 'Last Name is required';
    if (!/^\d{10}$/.test(customerData.phone)) errors.phone = 'Phone must be a 10-digit number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) errors.email = 'Invalid email address';
    customerData.addresses.forEach((address, index) => {
      if (!address.street.trim()) errors[`addressStreet_${index}`] = 'Street is required';
      if (!address.city.trim()) errors[`addressCity_${index}`] = 'City is required';
      if (!address.state.trim()) errors[`addressState_${index}`] = 'State is required';
      if (!address.zip.trim()) errors[`addressZip_${index}`] = 'Zip code is required';
      else if (!/^\d{5}$/.test(address.zip)) errors[`addressZip_${index}`] = 'Zip code must be a 5-digit number';
    });
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      axios.post('/api/customers', customerData)
        .then((response) => {
          navigate(`/customers/${response.data.id}`); // Redirect to customer profile after successful creation
        })
        .catch((error) => {
          console.error('There was an error creating the customer:', error);
        });
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div className="create-customer-container">
      <h1>Create New Customer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
          />
          {validationErrors.firstName && <span className="error">{validationErrors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
          />
          {validationErrors.lastName && <span className="error">{validationErrors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
          />
          {validationErrors.phone && <span className="error">{validationErrors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
          />
          {validationErrors.email && <span className="error">{validationErrors.email}</span>}
        </div>

        {customerData.addresses.map((address, index) => (
          <div key={index} className="address-group">
            <h3>Address {index + 1}</h3>
            <div className="form-group">
              <label htmlFor={`addressStreet_${index}`}>Street:</label>
              <input
                type="text"
                id={`addressStreet_${index}`}
                name="street"
                value={address.street}
                onChange={(e) => handleAddressChange(index, e)}
              />
              {validationErrors[`addressStreet_${index}`] && <span className="error">{validationErrors[`addressStreet_${index}`]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor={`addressCity_${index}`}>City:</label>
              <input
                type="text"
                id={`addressCity_${index}`}
                name="city"
                value={address.city}
                onChange={(e) => handleAddressChange(index, e)}
              />
              {validationErrors[`addressCity_${index}`] && <span className="error">{validationErrors[`addressCity_${index}`]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor={`addressState_${index}`}>State:</label>
              <input
                type="text"
                id={`addressState_${index}`}
                name="state"
                value={address.state}
                onChange={(e) => handleAddressChange(index, e)}
              />
              {validationErrors[`addressState_${index}`] && <span className="error">{validationErrors[`addressState_${index}`]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor={`addressZip_${index}`}>Zip Code:</label>
              <input
                type="text"
                id={`addressZip_${index}`}
                name="zip"
                value={address.zip}
                onChange={(e) => handleAddressChange(index, e)}
              />
              {validationErrors[`addressZip_${index}`] && <span className="error">{validationErrors[`addressZip_${index}`]}</span>}
            </div>

            <button
              type="button"
              className="remove-address-btn"
              onClick={() => removeAddress(index)}
            >
              Remove Address
            </button>
          </div>
        ))}

        <button
          type="button"
          className="add-address-btn"
          onClick={addNewAddress}
        >
          Add New Address
        </button>

        <button type="submit" className="submit-btn">Create Customer</button>
      </form>
    </div>
  );
};

export default CreateCustomer;

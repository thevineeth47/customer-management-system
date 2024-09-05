import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Replacing useHistory with useNavigate
import axios from 'axios';

const EditCustomer = () => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    addresses: [],
  });
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const { id } = useParams(); // Get customer ID from URL params

  useEffect(() => {
    // Fetch customer data from server
    axios.get(`/api/customers/${id}`)
      .then((response) => {
        setCustomerData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the customer data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!customerData.firstName) errors.firstName = 'First Name is required';
    if (!customerData.lastName) errors.lastName = 'Last Name is required';
    if (customerData.phone.length !== 10) errors.phone = 'Phone must be 10 digits';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(customerData.email)) errors.email = 'Invalid email address';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      axios.put(`/api/customers/${id}`, customerData)
        .then(() => {
          navigate(`/customers/${id}`); // Redirect to customer profile after successful update
        })
        .catch((error) => {
          console.error('There was an error updating the customer data:', error);
        });
    } else {
      setValidationErrors(errors);
    }
  };

  const addNewAddress = () => {
    setCustomerData({ ...customerData, addresses: [...customerData.addresses, { street: '', city: '', state: '', zip: '' }] });
  };

  const handleAddressChange = (index, e) => {
    const newAddresses = [...customerData.addresses];
    newAddresses[index][e.target.name] = e.target.value;
    setCustomerData({ ...customerData, addresses: newAddresses });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Customer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
          />
          {validationErrors.firstName && <span>{validationErrors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
          />
          {validationErrors.lastName && <span>{validationErrors.lastName}</span>}
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
          />
          {validationErrors.phone && <span>{validationErrors.phone}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
          />
          {validationErrors.email && <span>{validationErrors.email}</span>}
        </div>

        {customerData.addresses.map((address, index) => (
          <div key={index}>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <label>Zip:</label>
            <input
              type="text"
              name="zip"
              value={address.zip}
              onChange={(e) => handleAddressChange(index, e)}
            />
          </div>
        ))}

        <button type="button" onClick={addNewAddress}>
          Add New Address
        </button>
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

export default EditCustomer;

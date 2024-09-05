import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CustomerProfile = () => {
  const { id } = useParams();  // Get customer ID from the URL
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer details', error);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h2>Customer Profile</h2>
      <p><strong>First Name:</strong> {customer.firstName}</p>
      <p><strong>Last Name:</strong> {customer.lastName}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Email:</strong> {customer.email}</p>

      <h3>Addresses</h3>
      <ul>
        {customer.addresses.map((address, index) => (
          <li key={index}>
            {address.street}, {address.city}, {address.state}, {address.zipCode} {address.primary && '(Primary)'}
          </li>
        ))}
      </ul>

      <Link to={`/customers/${customer._id}/edit`}>Edit Customer</Link>
      <Link to="/">Back to Customer List</Link>
    </div>
  );
};

export default CustomerProfile;

// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // You can add styles here

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Customer Management System</h1>
      <p>Manage your customers efficiently with the tools provided in this application.</p>

      <div className="home-content">
        <section className="feature-section">
          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Customer Management:</strong> Add, update, and delete customer details.
            </li>
            <li>
              <strong>Multiple Addresses:</strong> Manage multiple addresses for each customer.
            </li>
            <li>
              <strong>Search and Filters:</strong> Search customers by name, city, or pin code.
            </li>
            <li>
              <strong>Responsive Design:</strong> Access the system on all devices.
            </li>
          </ul>
        </section>

        <section className="quick-links">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/create-customer" className="action-button create-btn">
              Create New Customer
            </Link>
            <Link to="/customer-list" className="action-button view-btn">
              View Customer List
            </Link>
          </div>
        </section>

        <section className="info-section">
          <h2>About This Application</h2>
          <p>
            This system allows you to manage customer information efficiently. It includes features like form validation, 
            error handling, and responsiveness to ensure smooth operations.
          </p>
          <p>
            Get started by creating a new customer or viewing your existing customers using the buttons above.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;

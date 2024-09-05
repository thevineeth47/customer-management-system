import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import CreateCustomer from './components/CreateCustomer';
import EditCustomer from './components/EditCustomer';
import CustomerProfile from './components/CustomerProfile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/create-customer" element={<CreateCustomer />} />
          <Route path="/customers/:id/edit" element={<EditCustomer />} />
          <Route path="/customers/:id" element={<CustomerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

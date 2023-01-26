import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //npm i react-router-dom
import RankingForm from './components/B6304577/ReviewOrders/RatingForm';
import Payment from './components/B6308490/Payment/Payment';
import EditPayment from './components/B6308490/Payment/EditPayment';
import PaymentShow from './components/B6308490/Payment/PaymentShow';

import AddressCreateForm from './components/B6321765/Address/AddressCreate';
import AddressShowForm from './components/B6321765/Address/AddressShow';
import AddressEditForm from './components/B6321765/Address/AddressEdit';
import OrderCreate from './components/B6304508/Order';
import ClaimForm from './components/B6304577/ClaimOrders/ClaimForm';
import ClaimOrderForAdmin from './components/B6304577/ClaimOrders/ClaimOrderForAdmin';
import DeviceCreateForm from './components/B6321765/Device/DeviceCreate';
import OrderUpdate from './components/B6304508/UpdateOrder';
import ShowOrder from './components/B6304508/ShowOrder';
import RefundCreate from './components/B6304508/Refund';
import RefundShow from './components/B6304508/ShowRefund';



function App() {
  return (
    <Router>
      <Routes>
        {/* ทดสอบหน้า fontent ที่นี่ */}
        <Route path="/" element={<PaymentShow />} /> 
        {/* ทดสอบหน้า fontent ที่นี่ */}
        <Route path="/ContentClaimOrder" element={<ClaimForm />} />
        <Route path="/ClaimOrderForAdmin" element={<ClaimOrderForAdmin />} />
        <Route path="/RankingForm" element={<RankingForm />} />
        <Route path="/OrderCreate" element={<OrderCreate />} />
        <Route path="/OrderUpdate" element={<OrderUpdate />} />
        <Route path="/ShowOrder" element={<ShowOrder />} />
        <Route path="/PaymentShow" element={<PaymentShow />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/EditPayment" element={<EditPayment />} />
        <Route path="/AddressCreatePage" element={<AddressCreateForm />} />
        <Route path="/AddressShowPage" element={<AddressShowForm/>} />
        <Route path="/AddressEditPage" element={<AddressEditForm/>} />
        <Route path="/DeviceCreatePage" element={<DeviceCreateForm/>} />
        <Route path="/RefundCreate" element={<RefundCreate />} />
        <Route path="/RefundCreate" element={<RefundShow />} />
      </Routes>
    </Router>
  );
}

export default App;

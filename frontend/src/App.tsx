import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //npm i react-router-dom
import RankingForm from './components/B6304577/ReviewOrders/RatingForm';
import Payment from './components/B6308490/Payment/Payment';
import EditPayment from './components/B6308490/Payment/EditPayment';
import PaymentShow from './components/B6308490/Payment/PaymentShow';


function App() {
  return (
    <Router>
      <Routes>
        {/* ทดสอบหน้า fontent ที่นี่ */}
        <Route path="/" element={<PaymentShow />} />
        {/* ทดสอบหน้า fontent ที่นี่ */}
        <Route path="/RankingForm" element={<RankingForm />} />
        <Route path="/PaymentShow" element={<PaymentShow />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/EditPayment" element={<EditPayment />} />
      </Routes>
    </Router>
  );
}

export default App;

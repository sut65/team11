import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //npm i react-router-dom
import RankingForm from './components/B6304577/ReviewOrders/RatingForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RankingForm />} />
      </Routes>
    </Router>
  );
}

export default App;

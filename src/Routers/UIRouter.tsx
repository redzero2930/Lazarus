import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from '../Components/UI/Button/Button';
import Select from '../Components/UI/Select/Select';

const UIRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/button" element={<Button />} />
        <Route path="/select" element={<Select />} />
      </Routes>
    </Router>
  );
};

export default UIRouter;
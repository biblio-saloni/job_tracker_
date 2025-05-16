import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-job" element={<JobForm />} />
      <Route path="/jobs" element={<JobList />} />
    </Routes>
  );
};

export default App;

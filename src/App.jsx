import React from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

const App = () => {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Job Application Tracker</h1>
      <JobForm />
      <JobList />
    </div>
  );
};

export default App;

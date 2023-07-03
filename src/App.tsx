import React from 'react';
import HomePage from './pages/homePage';
import JobPage from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';


import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';

const App: React.FC = () => {
  return (
    <main className='App'>
      <center>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addJob" element={<AddJobPage />} />
            <Route path="/itemJob" element={<JobPage />} />
          </Routes>
        </BrowserRouter>

      </center>
    </main>
  )
}

export default App;


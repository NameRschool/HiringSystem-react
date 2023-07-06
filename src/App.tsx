import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import HomePage from './pages/homePage';
import JobPage from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import CandidatesPage from './pages/CandidatesPage';



const App: React.FC = () => {

  return (
    <main className='App'>
      <title>communtiy</title>
      <center>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addJob" element={<AddJobPage />} />
            <Route path="/itemJob" element={<JobPage />} />
            <Route path="/candidatesPage" element={<CandidatesPage />} />

          </Routes>
        </BrowserRouter>

      </center>
    </main>
  )
}

export default App

import AddJob from './components/AddJob';
import JobItem from './components/JobItem'
import TransitionsModal from './components/CandidatesModal';

const App: React.FC = () => {

  return (
    <main className='App'>
      <center>
        <JobItem />
        <AddJob/>
        <TransitionsModal/>
         </center>

    </main>
  )
}

export default App

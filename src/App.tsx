import AddJob from './components/AddJob';
import JobItem from './components/JobItem'

const App: React.FC = () => {

  return (
    <main className='App'>
      <center>
        <h1>My jobs</h1>
        <JobItem />
        <AddJob/>
      </center>

    </main>
  )
}

export default App

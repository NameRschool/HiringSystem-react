import React, { useEffect, useState } from 'react'
// import TodoItem from './components/TodoItem'
 import AddJob from './components/AddJob'
import { getJobs,addJob } from './api/JobsApi'
import axios, { AxiosResponse } from 'axios';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<IjobType[]>([]);

  useEffect(() => {
    fetchJobs()
  },[])

  const fetchJobs = (): void => {
    getJobs()
      .then((response: AxiosResponse<IjobType, any>) => {
        console.log(response.data);
        const  jobs = response.data;
        console.log(typeof jobs)
        if (jobs && Array.isArray(jobs)) {
          const jobsArray: IjobType[] = jobs.map((job: IjobType) => ({
            _id: job._id,
            name: job.name,
            location: job.location,
            jobDescription: job.jobDescription,
            companyDescription: job.companyDescription,
            requierments: job.requierments, 
          }));
        setJobs(jobsArray);
        }
      })
      .catch((err: Error) => console.log(err));
  };
  // const handleSaveJob = (e: React.FormEvent, formData: IjobType): void => {
  //   e.preventDefault()
  //   addJob(formData)
  //     .then(({ status, data }) => {
  //       if (status !== 201) {
  //         throw new Error("Error! Todo not saved")
  //       }
  //       setJobs(data.jobs)
  //     })
  //     .catch(err => console.log(err))
  // }
  // const handleUpdateTodo = (todo: ITodo): void => {
  //   updateTodo(todo)
  //     .then(({ status, data }) => {
  //       if (status !== 200) {
  //         throw new Error("Error! Todo not updated")
  //       }
  //       setTodos(data.todos)
  //     })
  //     .catch(err => console.log(err))
  // }

  // const handleDeleteTodo = (_id: string): void => {
  //   deleteTodo(_id)
  //     .then(({ status, data }) => {
  //       if (status !== 200) {
  //         throw new Error("Error! Todo not deleted")
  //       }
  //       setTodos(data.todos)
  //     })
  //     .catch(err => console.log(err))
  // }
  return (
    <main className='App'>
      <h1>My jobs</h1>
      {Array.isArray(jobs) && jobs.length > 0 && jobs.map((job: IjobType) => (
        <div key={job._id}>
          <h2>{job.name}</h2>
          <p>{job.location}</p>
        </div>
      ))}
      {/* <AddJob saveJob={handleSaveJob} /> */}
      {/* {jobs.map((job: IjobType) => (
        <TodoItem
          key={job._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))} */}
    </main>
  )
}

export default App

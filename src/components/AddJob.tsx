import React from "react"

type Props = JobsProps & {
  updateJob: (job: IjobType) => void
  deleteJob: (_id: string) => void
}
const Todo: React.FC<Props> = ({ jobs, updateJob, deleteJob }) => {
    const checkJobs: string = jobs.status ? `line-through` : ""
    return (
      <div className="Card">
        <div className="Card--text">
          <h1 className={checkJobs}>{jobs.name}</h1>
          <span className={checkJobs}>{jobs.location}</span>
        </div>
        <div className="Card--button">
          <button
            onClick={() => updateJob(jobs)}
            className={jobs.status ? `hide-button` : "Card--button__done"}
          >
            Complete
          </button>
          <button
            onClick={() => deleteJob(jobs._id)}
            className="Card--button__delete"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
  
  export default Todo

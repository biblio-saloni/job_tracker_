import React from "react";
import { useDispatch } from "react-redux";
import { deleteJob } from "../features/jobs/jobsSlice";

const JobItem = ({ job }) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>
        {job.position} at {job.company}
      </h3>
      <p>Status: {job.status}</p>
      <p>Applied on: {job.date}</p>
      <button onClick={() => dispatch(deleteJob(job.id))}>Delete</button>
    </div>
  );
};

export default JobItem;

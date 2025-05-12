import React from "react";
import { useSelector } from "react-redux";
import JobItem from './JobItem';

const JobList = () => {
    const jobs = useSelector(state => state.jobs);

    return (
        <div>
            {jobs.map(job => (
                <JobItem key={job.id} job={job}/>
            ))}
        </div>
    );
};

export default JobList;
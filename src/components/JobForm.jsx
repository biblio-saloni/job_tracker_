import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "../features/jobs/jobsSlice";

const JobForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.company && formData.position && formData.date) {
      dispatch(addJob(formData));
      setFormData({ company: "", position: "", status: "Applied", date: "" });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
      />
      <input
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>In Progress</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;

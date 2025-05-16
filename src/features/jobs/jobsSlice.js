import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    company: "Google",
    position: "SWE",
    status: "Rejected",
    date: "2024-12-19",
  },
];

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [
      {
        id: "1",
        company: "Google",
        position: "SWE",
        status: "Rejected",
        date: "2024-12-19",
      },
    ],
    currentJob: null,
  },
  reducers: {
    addJob: {
      reducer(state, action) {
        state.jobs.push(action.payload);
      },
      prepare(job) {
        return {
          payload: {
            id: nanoid(),
            ...job,
          },
        };
      },
    },
    deleteJob(state, action) {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    updateJob(state, action) {
      const updatedJob = action.payload;
      const index = state.jobs.findIndex((job) => job.id === updatedJob.id);
      if (index !== -1) {
        state.jobs[index] = updatedJob;
      }
    },
    setCurrentJob(state, action) {
      state.currentJob = action.payload;
    },
    clearCurrentJob(state) {
      state.currentJob = null;
    },
  },
});

export const { addJob, deleteJob, updateJob, setCurrentJob, clearCurrentJob } =
  jobsSlice.actions;
export default jobsSlice.reducer;

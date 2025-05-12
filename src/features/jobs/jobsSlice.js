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
  initialState,
  reducers: {
    addJob: {
      reducer(state, action) {
        state.push(action.payload);
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
      return state.filter((job) => job.id !== action.payload);
    },
    updateJob(state, action) {
      const index = state.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addJob, deleteJob, updateJob} = jobsSlice.actions;
export default jobsSlice.reducer;

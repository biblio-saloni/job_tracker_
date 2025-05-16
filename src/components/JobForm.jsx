import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearCurrentJob, addJob, updateJob } from "../features/jobs/jobsSlice";
import { useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

const JobForm = () => {
  const dispatch = useDispatch();
  const currentJob = useSelector((state) => state.jobs.currentJob);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    date: null,
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (currentJob) {
      setFormData({
        ...currentJob,
        date: currentJob.date ? new Date(currentJob.date) : null,
      });
      setIsEditMode(true);
    }
  }, [currentJob]);

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.date) newErrors.date = "Date is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formattedDate = formData.date
        ? format(new Date(formData.date), "yyyy-MM-dd")
        : null;

      const updatedFormData = {
        ...formData,
        date: formattedDate,
      };

      if (currentJob) {
        dispatch(updateJob({ ...updatedFormData, id: currentJob.id }));
        dispatch(clearCurrentJob()); // 👈 Clean up edit state
      } else {
        dispatch(addJob(updatedFormData));
      }

      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/jobs");
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToJobList = () => {
    navigate("/jobs");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 450,
          maxWidth: 600,
          margin: "0 auto",
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          mt: 8,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Job Details
        </Typography>

        <TextField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.company}
          helperText={errors.company}
        />
        <TextField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.position}
          helperText={errors.position}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={formData.date}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                error: !!errors.date,
                helperText: errors.date,
              },
            }}
          />
        </LocalizationProvider>

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Interview & Rejected">
              Interview & Rejected
            </MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? "Update Job" : "Add Job"}
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={(event, reason) => {
            handleCloseSnackbar(event, reason);
            setIsEditMode(false);
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {isEditMode
              ? "Job updated successfully!"
              : "Job added successfully!"}
          </Alert>
        </Snackbar>
      </Box>

      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<HomeIcon />}
          onClick={goToHome}
          sx={{ color: "#fff" }}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<ListAltIcon />}
          onClick={goToJobList}
          sx={{ borderColor: "#fff", color: "#1976d2" }}
        >
          Job List
        </Button>
      </Box>
    </Box>
  );
};

export default JobForm;

import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import JobItem from "./JobItem";
import { setCurrentJob, updateJob } from "../features/jobs/jobsSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const JobList = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleBackClick = () => {
    navigate("/add-job");
  };

  const handleEdit = (job) => {
    dispatch(setCurrentJob(job));
    navigate("/add-job");
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchMatch =
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.position.toLowerCase().includes(search.toLowerCase());

      const statusMatch = statusFilter ? job.status === statusFilter : true;

      const jobDate = dayjs(job.date);
      const dateMatch =
        startDate && endDate
          ? jobDate.isAfter(dayjs(startDate).subtract(1, "day")) &&
            jobDate.isBefore(dayjs(endDate).add(1, "day"))
          : true;

      return searchMatch && statusMatch && dateMatch;
    });
  }, [jobs, search, statusFilter, startDate, endDate]);

  const handleExport = () => {
    const headers = ["Company", "Position", "Status", "Date"];
    const rows = filteredJobs.map((job) => [
      job.company,
      job.position,
      job.status,
      job.date,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "jobs.csv";
    link.click();
  };

  return (
    <Box p={3}>
      <IconButton onClick={handleBackClick}>
        <ArrowBackIcon />
      </IconButton>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={2}
        gap={2}
      >
        <Typography variant="h5" gutterBottom sx={{ whiteSpace: "nowrap" }}>
          Job List
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
        >
          <TextField
            label="Search by Company or Position"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ width: 270 }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Offer">Offer</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" alignItems="center" gap={1}>
              <DatePicker
                label="From"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: "small", sx: { width: 150 } } }}
              />
              <DatePicker
                label="To"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: "small", sx: { width: 150 } } }}
              />
            </Box>
          </LocalizationProvider>

          <IconButton onClick={handleExport} color="primary">
            <FileDownloadIcon />
          </IconButton>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setStartDate(null);
              setEndDate(null);
            }}
          >
            Clear
          </Button>
        </Stack>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(search || statusFilter || startDate || endDate
            ? filteredJobs
            : jobs
          ).length > 0 ? (
            (search || statusFilter || startDate || endDate
              ? filteredJobs
              : jobs
            ).map((job) => (
              <JobItem key={job.id} job={job} onEdit={handleEdit} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default JobList;

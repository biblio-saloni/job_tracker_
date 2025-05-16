import React from "react";
import {
  TableRow,
  TableCell,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteJob } from "../features/jobs/jobsSlice";

const statusColors = {
  Applied: "info",
  Interview: "warning",
  "Interview & Rejected": "error",
  "In Progress": "warning",
  Offer: "success",
  Rejected: "error",
};

const JobItem = ({ job, onEdit }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    handleDelete(job.id);
    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteJob(job.id));
  };

  return (
    <TableRow>
      <TableCell>{job.company}</TableCell>
      <TableCell>{job.position}</TableCell>
      <TableCell>
        <Chip
          label={job.status}
          color={statusColors[job.status] || "default"}
          variant="outlined"
        />
      </TableCell>
      <TableCell>{job.date}</TableCell>
      <TableCell>
        <Tooltip title="Edit">
          <IconButton onClick={() => onEdit(job)} color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={handleOpen} color="error">
            <DeleteIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to delete this job?</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirm} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default JobItem;

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

export default function LoadingModal({ open, title }) {
  return (
    <Dialog
      open={open}
      aria-labelledby="loading-dialog-title"
      PaperProps={{
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        },
      }}
    >
      <DialogTitle id="loading-dialog-title">
        <Typography variant="h6" align="center">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

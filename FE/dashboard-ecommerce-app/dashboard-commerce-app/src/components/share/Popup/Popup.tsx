import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./Popup.scss";

interface PopupProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Popup: React.FC<PopupProps> = ({
  title,
  children,
  maxWidth = "md",
  open,
  onClose,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      sx={{ minWidth: 400 }}
    >
      <DialogTitle
        style={{ fontFamily: "Open Sans" }}
        className="font-weight-bolder"
      >
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          className="badge badge-sm bg-gradient-secondary color-white"
        >
          {cancelText}{" "}
        </Button>
        {onSubmit && (
          <Button onClick={onSubmit} className="btn bg-gradient-info">
            {submitText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;

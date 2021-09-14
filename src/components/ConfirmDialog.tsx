import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "react";

type ConfirmDialogProps = {
  show: boolean;
  title: string;
  message: ReactNode;
  onAccept: () => void;
  onReject: () => void;
  acceptText?: string;
  rejectText?: string;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  show,
  title,
  message,
  onAccept,
  onReject,
  acceptText,
  rejectText,
}) => {
  acceptText = acceptText ?? "Ok";
  rejectText = rejectText ?? "Cancel";

  return (
    <div>
      <Dialog
        open={show}
        onClose={onReject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onReject}>{rejectText}</Button>
          <Button onClick={onAccept} autoFocus>
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;

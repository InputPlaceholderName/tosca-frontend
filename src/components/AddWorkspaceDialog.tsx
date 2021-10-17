import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";

export type NewWorkspaceProps = {
  name: string;
};

type AddWorkspaceDialogProps = {
  closeCallback: () => void;
  // eslint-disable-next-line no-unused-vars
  successCallback: (arg0: NewWorkspaceProps) => void;
};

const AddWorkspaceDialog: React.FC<AddWorkspaceDialogProps> = ({
  closeCallback,
  successCallback,
}) => {
  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={successCallback}
      validate={({ name }) => {
        if (name.trim().length === 0) {
          return { name: "Name can not be empty" };
        }
        return {};
      }}
      isInitialValid={false}
    >
      {({
        values,
        handleChange,
        submitForm,
        isSubmitting,
        isValid,
        errors,
        touched,
      }) => {
        return (
          <Dialog open={true} onClose={closeCallback}>
            <DialogTitle>New workspace</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter new workspace name:</DialogContentText>
              <TextField
                value={values.name}
                onChange={handleChange}
                autoFocus
                margin="dense"
                name="name"
                label="Workspace name"
                type="text"
                fullWidth
                variant="standard"
                error={touched.name}
                helperText={touched.name && errors.name}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeCallback}>Cancel</Button>
              <Button onClick={submitForm} disabled={!isValid || isSubmitting}>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default AddWorkspaceDialog;

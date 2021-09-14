import {
  DeleteForeverOutlined,
  PersonAdd,
  PersonRemove,
  Save,
  Settings,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAllUsers, User } from "../api/users";
import {
  getWorkspace,
  FullWorkspace,
  Role,
  FullWorkspaceUser,
  addUserToWorkspace,
  parseRole,
  DefaultFullWorkspace,
  deleteUserFromWorkspace,
  updateWorkspaceUser,
  updateWorkspace,
  deleteWorkspace,
} from "../api/workspaces";
import ConfirmDialog from "../components/ConfirmDialog";
import Container from "../components/Container";
import Section from "../components/Section";
import { formatName } from "../util/user_util";

type FieldProps = {
  name: string;
  label: string;
  values: any;
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  disabled?: boolean;
  multiline?: boolean;
};

const ToscaTextField: React.FC<FieldProps> = ({
  name,
  label,
  values,
  handleChange,
  disabled,
  multiline,
}) => {
  const fieldDisabled = disabled ?? false;
  const isMultiline = multiline ?? false;
  return (
    <TextField
      className="mb-4 bg-white"
      name={name}
      variant="outlined"
      label={label}
      fullWidth={true}
      value={values[name]}
      onChange={handleChange}
      disabled={fieldDisabled}
      multiline={isMultiline}
    />
  );
};

const AdminWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workspace, setWorkspace] =
    useState<FullWorkspace>(DefaultFullWorkspace);
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [nonWorkspaceUsers, setNonWorkspaceUsers] = useState<User[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const [showDeleteWorkspaceDialog, setShowDeleteWorkspaceDialog] =
    useState(false);

  useEffect(() => {
    loadUsers();
    loadWorkspace();
  }, []);

  useEffect(() => {
    setNonWorkspaceUsers(
      users.filter((user) => {
        return (
          workspace.users.find(
            (workspaceUser) => workspaceUser.user.id === user.id
          ) === undefined && user.id != workspace.creator?.id
        );
      })
    );
  }, [users, workspace]);

  const loadUsers = async () => {
    const { data } = await getAllUsers();
    setUsers(data);
    setLoadingUsers(false);
  };

  const loadWorkspace = async () => {
    const { data } = await getWorkspace(parseInt(id));
    setWorkspace(data);
    setLoadingWorkspace(false);
  };

  const removeUserFromWorkspace = async ({ id }: User) => {
    await deleteUserFromWorkspace(workspace.id, id);
    const newWorkspace = { ...workspace };
    newWorkspace.users = newWorkspace.users.filter(({ user }) => user.id != id);

    setWorkspace(newWorkspace);
    enqueueSnackbar("User removed!", { variant: "warning" });
  };

  const addUser = async ({ role, user: { id } }: FullWorkspaceUser) => {
    const { data } = await addUserToWorkspace(workspace!.id, id, role);
    setUpdatedUser(data);

    enqueueSnackbar("User added!", { variant: "success" });
  };

  const modifyUser = async (user: number, role: Role) => {
    const { data } = await updateWorkspaceUser(workspace.id, user, role);
    setUpdatedUser(data);
    enqueueSnackbar("User role updated!", { variant: "success" });
  };

  const setUpdatedUser = (newUser: FullWorkspaceUser) => {
    const users = [...workspace!.users];
    const index = users.findIndex((value) => value.user.id === newUser.user.id);

    if (index === -1) {
      users.push(newUser);
    } else {
      users[index] = newUser;
    }

    setWorkspace({ ...workspace!, users });
  };

  const initialSelectedUser: { user: User | null; role: Role } = {
    user: null,
    role: Role.Normal,
  };

  const confirmDeleteWorkspace = () => {
    deleteWorkspace(workspace.id);
    setShowDeleteWorkspaceDialog(false);
    enqueueSnackbar("Workspace deleted! Redirecting..");

    // Give backend some grace time to delete the workspace
    // before loading the workspace list
    window.setTimeout(() => {
      history.replace("/admin");
    }, 1000);
  };

  const rejectDeleteWorkspace = () => {
    setShowDeleteWorkspaceDialog(false);
  };

  const handleUpdateWorkspace = async (workspace: FullWorkspace) => {
    const { data } = await updateWorkspace(
      workspace.id,
      workspace.name,
      workspace.information,
      workspace.creator?.id
    );

    setWorkspace(data);
    enqueueSnackbar("Update successful!", { variant: "success" });
  };

  return (
    <Container>
      {loadingWorkspace && <CircularProgress />}
      <Section title="Workspace details">
        {!loadingWorkspace && (
          <Formik initialValues={workspace} onSubmit={handleUpdateWorkspace}>
            {({
              values,
              handleChange,
              dirty,
              setFieldValue,
              isSubmitting,
              submitForm,
              resetForm,
            }) => (
              <Form>
                <ToscaTextField
                  name="name"
                  label="Workspace name"
                  handleChange={handleChange}
                  values={values}
                />
                <ToscaTextField
                  name="information"
                  label="Information"
                  handleChange={handleChange}
                  values={values}
                  multiline={true}
                />
                <Autocomplete
                  disablePortal
                  className="mb-4 bg-white"
                  options={users ?? []}
                  value={values.creator}
                  isOptionEqualToValue={(a, b) => a.id == b.id}
                  getOptionLabel={(user) =>
                    `${formatName(user)} (${user.userId})`
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Creator" />
                  )}
                  onChange={(_event, user) => setFieldValue("creator", user)}
                />
                <div className="flex justify-between md:justify-center gap-2">
                  <div className="hidden md:block md:flex-1"></div>
                  <Button
                    className="flex-1 md:flex-none text-xs"
                    disabled={!dirty || isSubmitting}
                    variant="contained"
                    startIcon={<Save />}
                    onClick={() => {
                      resetForm({ values });
                      submitForm();
                    }}
                  >
                    Save
                  </Button>
                  <div className="flex-1 text-right">
                    <Button
                      className="text-xs"
                      color="error"
                      variant="contained"
                      startIcon={<DeleteForeverOutlined />}
                      onClick={() => setShowDeleteWorkspaceDialog(true)}
                    >
                      Delete workspace
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Section>
      <Section title="Users">
        {!loadingUsers && (
          <Formik
            initialValues={initialSelectedUser}
            onSubmit={async (data) => {
              if (nonWorkspaceUsers.find((user) => user.id === data.user?.id)) {
                await addUser({ user: data.user!, role: parseRole(data.role) });
              } else {
                await modifyUser(data.user!.id, data.role);
              }
            }}
          >
            {({
              values,
              handleChange,
              setFieldValue,
              submitForm,
              isSubmitting,
            }) => {
              return (
                <>
                  <Form>
                    <Autocomplete
                      disablePortal
                      className="mb-4 bg-white"
                      options={nonWorkspaceUsers}
                      value={values.user}
                      isOptionEqualToValue={(a, b) => a.id == b.id}
                      getOptionLabel={(user) =>
                        `${formatName(user)} (${user.userId})`
                      }
                      onChange={(_event, user) => {
                        setFieldValue("user", user);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="User" />
                      )}
                    />
                    <div className="flex">
                      <FormControl className="flex-grow">
                        <InputLabel>Role</InputLabel>
                        <Select
                          className="bg-white"
                          name="role"
                          value={values.role}
                          label="Role"
                          onChange={handleChange}
                        >
                          <MenuItem value={Role.Normal}>Normal</MenuItem>
                          <MenuItem value={Role.Admin}>Admin</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        className="ml-2"
                        variant="contained"
                        color="primary"
                        startIcon={<PersonAdd />}
                        onClick={submitForm}
                        disabled={!values.user || isSubmitting}
                      >
                        {!values.user ||
                        nonWorkspaceUsers.find(
                          (user) => user.id === values.user?.id
                        )
                          ? "Add"
                          : "Modify"}
                      </Button>
                    </div>
                  </Form>
                  <Divider className="mt-2 mb-2" />
                  {!loadingWorkspace &&
                    workspace.users.map(({ user, role }, key) => {
                      return (
                        <div
                          className="p-2 bg-white flex shadow rounded-md mt-2"
                          key={key}
                        >
                          <div className="text-sm flex-grow flex flex-col justify-between">
                            <span>{formatName(user)}</span>
                            <span className="text-gray-500 text-xs">
                              {user.userId}
                            </span>
                          </div>
                          <div className="text-sm flex flex-col justify-between">
                            <span className="text-xs text-gray-500 text-right">
                              {role}
                            </span>
                            <div>
                              <IconButton
                                className="text-secondary"
                                onClick={() => removeUserFromWorkspace(user)}
                              >
                                <PersonRemove />
                              </IconButton>
                              <IconButton
                                className="text-primary"
                                onClick={() => {
                                  setFieldValue("user", user);
                                  setFieldValue("role", role);
                                }}
                              >
                                <Settings />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </>
              );
            }}
          </Formik>
        )}
      </Section>
      <ConfirmDialog
        show={showDeleteWorkspaceDialog}
        title="Are you sure?"
        message="Are you sure you want to delete the workspace? This action can not be reverted."
        onAccept={confirmDeleteWorkspace}
        onReject={rejectDeleteWorkspace}
        acceptText="Yes"
      />
    </Container>
  );
};

export default AdminWorkspace;

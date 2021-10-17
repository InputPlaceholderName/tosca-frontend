import { Add } from "@mui/icons-material";
import { CircularProgress, Fab } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { addWorkspace, getAllWorkspaces, Workspace } from "../api/workspaces";
import AddWorkspaceDialog, {
  NewWorkspaceProps,
} from "../components/AddWorkspaceDialog";
import AdminWorkspaceList from "../components/AdminWorkspaceList";
import Container from "../components/Container";

const AdminWorkspaces: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [showProgress, setShowProgress] = useState(false);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    loadWorkspaces();

    const timeout = setTimeout(() => {
      if (loadingWorkspaces) {
        setShowProgress(true);
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const loadWorkspaces = async () => {
    const { data } = await getAllWorkspaces();
    sortWorkspaces(data);
    setWorkspaces(data);
    setShowProgress(false);
    setLoadingWorkspaces(false);
  };

  const handleCreateWorkspace = async ({ name }: NewWorkspaceProps) => {
    setAddDialogVisible(false);
    const { data } = await addWorkspace(name, "");
    const newWorkspaces = [...workspaces, data];
    sortWorkspaces(newWorkspaces);
    setWorkspaces(newWorkspaces);
    enqueueSnackbar("Workspace added!", { variant: "success" });
  };

  const sortWorkspaces = (workspaces: Workspace[]) => {
    workspaces.sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <>
      {showProgress && loadingWorkspaces && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      <Container>
        <AdminWorkspaceList workspaces={workspaces} />
        <div className="flex full justify-center mt-4 pb-4">
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setAddDialogVisible(true)}
          >
            <Add /> New workspace
          </Fab>
        </div>
      </Container>
      {addDialogVisible && (
        <AddWorkspaceDialog
          successCallback={handleCreateWorkspace}
          closeCallback={() => setAddDialogVisible(false)}
        />
      )}
    </>
  );
};

export default AdminWorkspaces;

import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllWorkspaces, Workspace } from "../api/workspaces";
import AdminWorkspaceList from "../components/AdminWorkspaceList";
import Container from "../components/Container";

const AdminWorkspaces: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [showProgress, setShowProgress] = useState(false);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);

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
    data.sort((a, b) => a.name.localeCompare(b.name));
    setWorkspaces(data);
    setShowProgress(false);
    setLoadingWorkspaces(false);
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
      </Container>
    </>
  );
};

export default AdminWorkspaces;

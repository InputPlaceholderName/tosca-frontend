import React from "react";
import {
  isFullUserWorkspace,
  Role,
  Workspace,
  WorkspaceType,
} from "../api/workspaces";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

type AdminWorkspaceListProps = {
  workspaces: Workspace[];
};

const AdminWorkspaceList: React.FC<AdminWorkspaceListProps> = ({
  workspaces,
}) => {
  return (
    <div>
      {workspaces.map((workspace, key) => {
        return <AdminWorkspaceTableItem key={key} workspace={workspace} />;
      })}
    </div>
  );
};

export default AdminWorkspaceList;

type AdminWorkspaceTableItemProps = {
  workspace: WorkspaceType;
};

const AdminWorkspaceTableItem: React.FC<AdminWorkspaceTableItemProps> = ({
  workspace,
}) => {
  const history = useHistory();
  let role: Role | undefined;

  let workspaceData = ((workspace: WorkspaceType) => {
    if (isFullUserWorkspace(workspace)) {
      role = workspace.role;
      return workspace.workspace;
    } else {
      return workspace;
    }
  })(workspace);

  return (
    <div
      className="cursor-pointer rounded-md shadow border p-2 mb-1"
      onClick={() => history.push(`/admin/workspaces/${workspaceData.id}`)}
    >
      <div className="flex flex-col md:flex-row justify-between">
        <div>{workspaceData.name}</div>
        <div className="text-sm">
          Created at:&nbsp;
          <span className="text-gray-500 ">
            {dayjs(workspaceData.createdAt).format("YYYY-MM-DD")}
          </span>
        </div>
      </div>
      <div className="text-sm flex flex-col md:flex-row justify-between">
        <span>
          Creator:&nbsp;
          <span className="text-gray-500">
            {workspaceData.creator
              ? `${workspaceData.creator.firstName} ${workspaceData.creator.lastName}`
              : "No creator"}
          </span>
        </span>
        <span>
          {role && (
            <>
              Role:&nbsp;
              <span className="text-gray-500">{role}</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export const AdminWorkspace: React.FC<{ workspace: Workspace }> = ({
  workspace,
}) => {
  return <p>{workspace.name}</p>;
};

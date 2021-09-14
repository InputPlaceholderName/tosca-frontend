import { client, API_BASE } from "./api-client";
import { User } from "./users";

export enum Role {
  // eslint-disable-next-line no-unused-vars
  Admin = "Admin",
  // eslint-disable-next-line no-unused-vars
  Normal = "Normal",
}

export const parseRole = (str: String) => {
  return str.toLowerCase() == "admin" ? Role.Admin : Role.Normal;
};

export interface Workspace {
  id: number;
  name: string;
  information: string;
  creator?: User;
  createdAt: string;
  role?: Role;
}

export interface FullWorkspace extends Workspace {
  signups: Signup[];
  waitingLists: WaitingList[];
  users: FullWorkspaceUser[];
}

export const DefaultFullWorkspace: FullWorkspace = {
  id: 0,
  name: "Not loaded",
  information: "Not loaded",
  createdAt: "1970-01-01T00:00:00",
  signups: [],
  waitingLists: [],
  users: [],
};

export interface FullWorkspaceUser {
  role: Role;
  user: User;
}

export interface FullUserWorkspace {
  id: number;
  role: Role;
  workspace: Workspace;
}

export type WorkspaceType = Workspace | FullUserWorkspace;

export const isFullUserWorkspace = (
  workspace: WorkspaceType
): workspace is FullUserWorkspace =>
  (workspace as FullUserWorkspace).role !== undefined;

export interface Signup {
  id: number;
  title: string;
  information: string;
  maxUserSignups: number;
}

export interface WaitingList {
  id: number;
  title: string;
  information: string;
}

export const getAllWorkspaces = () => {
  return client.get<Workspace[]>(`${API_BASE}/v1/workspaces`);
};

export const getWorkspace = (id: number) => {
  return client.get<FullWorkspace>(`${API_BASE}/v1/workspaces/${id}`);
};

export const addWorkspace = (name: string, information: string) => {
  return client.post<Workspace>(`${API_BASE}/v1/workspaces`, {
    name,
    information,
  });
};

export const deleteWorkspace = (id: number) => {
  return client.delete<void>(`${API_BASE}/v1/workspaces/${id}`);
};

export const updateWorkspace = (
  id: number,
  name?: string,
  information?: string,
  creator?: number
) => {
  const data = { name, information, creator };
  return client.patch<FullWorkspace>(`${API_BASE}/v1/workspaces/${id}`, data);
};

export const addUserToWorkspace = (
  workspaceId: number,
  user: number,
  role: Role
) => {
  return client.post<FullWorkspaceUser>(
    `${API_BASE}/v1/workspaces/${workspaceId}/users`,
    { user, role }
  );
};

export const updateWorkspaceUser = (
  workspaceId: number,
  user: number,
  role: Role
) => {
  return client.put<FullWorkspaceUser>(
    `${API_BASE}/v1/workspaces/${workspaceId}/users/${user}`,
    { role }
  );
};

export const deleteUserFromWorkspace = (workspaceId: number, user: number) => {
  return client.delete<void>(
    `${API_BASE}/v1/workspaces/${workspaceId}/users/${user}`
  );
};

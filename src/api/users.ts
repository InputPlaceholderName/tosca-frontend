import { client, API_BASE } from "./api-client";
import { Workspace } from "./workspaces";

export const getAllUsers = () => {
  return client.get<User[]>(`${API_BASE}/v1/users`);
};

export const getUser = (id: number) => {
  return client.get<FullUser>(`${API_BASE}/v1/users/${id}`);
};

export interface User {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
}

export const DefaultUser: User = {
  id: 0,
  userId: "undefined",
  firstName: "Not loaded",
  lastName: "Not loaded",
};

export interface FullUser extends User {
  workspaces: Workspace[];
}

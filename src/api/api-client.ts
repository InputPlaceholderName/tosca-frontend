import axios, { AxiosResponse } from "axios";

export const API_BASE = process.env.REACT_APP_API_BASE;

export const client = axios.create();

client.interceptors.response.use(undefined, (error) => {
  if (error.response?.status == 401) {
    handlers["unauthorized"]?.();
  }
});

export const setAuthorization = (token: string) => {
  client.interceptors.request.use((cfg) => {
    cfg.headers.common["Authorization"] = `Bearer ${token}`;

    return cfg;
  });
};

type Handler = (() => void) | null;

type Handlers = {
  [key: string]: Handler;
};

const handlers: Handlers = {
  unauthorized: null,
};

export const setUnauthorizedHandler = (handler: Handler) => {
  handlers["unauthorized"] = handler;
};

type Group = "SuperUser" | "Admin" | "Everyone";

export interface ApiUser {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  groups: Group[];
}

export type Response<T> = Promise<AxiosResponse<T>>;

export const getCurrentUser = (): Response<ApiUser> => {
  return client.get<ApiUser>(`${API_BASE}/v1/user`);
};

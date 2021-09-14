import { User } from "../api/users";

export function formatName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

import { Role } from "./users.role.enum";

export interface UserDocument {
    id: string;
    username: string;
    email: string;
    password?: string;
    role: Role;
  }
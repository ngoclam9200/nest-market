import { Roles } from '../common/user-roles.enum';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  gender: number;
  roles: Roles[];
  created_at: string;
  updated_at: string;
  status: boolean;
  branch_id: number;
}

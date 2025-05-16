import { Roles } from '../common/user-roles.enum';

export class UserResponse {
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
}

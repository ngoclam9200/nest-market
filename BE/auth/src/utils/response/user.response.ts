import { status } from '@grpc/grpc-js';
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
}

export function mapUserResponse(user: UserResponse, token?: string) {
  const response = {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    created_at: user.created_at,
    updated_at: user.updated_at,
    roles: user.roles,
    status: user.status,
    access_token: token,
  };
  if (token) {
    return { ...response, access_token: token };
  }
  return response;
}

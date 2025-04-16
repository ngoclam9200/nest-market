import { UserEntity } from 'src/user/entities/user.entity';

export function mapUserResponse(user: UserEntity, token?: string) {
  const response = {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    gender: user.gender,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
    roles: user.roles,
    access_token: token,
    branch_id: user.branch_id,
  };
  if (token) {
    return { ...response, access_token: token };
  }
  return response;
}

import { UserEntity } from 'src/user/entities/user.entity';
import { formatDateTime } from '../common/date-time-format';

export function mapUserResponse(user: UserEntity, token?: string) {
  const response = {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    gender: user.gender,
    status: user.status,
    created_at: formatDateTime(user.created_at),
    updated_at: formatDateTime(user.updated_at),
    roles: user.roles,
    access_token: token,
  };
  if (token) {
    return { ...response, access_token: token };
    
  }
  return response;
}

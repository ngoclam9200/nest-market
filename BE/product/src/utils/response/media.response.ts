import { Roles } from '../common/user-roles.enum';

export interface MediaResponse {
  id: number;
  url: string;
  name: string;
  size: number;
  type: number;
  created_at: string;
  status: boolean;
}

export function mapResponseMediaDefault(id: number) {
  return {
    id: id,
    url: '',
    name: '',
    size: 0,
    type: 0,
    created_at: '',
    status: false,
  };
}

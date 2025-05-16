import { UserResponse } from './user.response';

export class CategoryResponse {
  id: number = 0;
  name: string = '';
  description: string = '';
  media_id: number;
  created_at: string = '';
  updated_at: string = '';
  user_created?: UserResponse = new UserResponse();
  parent_id: number = 0;
  code: string = '';
  status: number = 0;
  constructor(data?: Partial<CategoryResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

 

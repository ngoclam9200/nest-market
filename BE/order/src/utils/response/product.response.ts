import { UserResponse } from './user.response';
 

export class ProductResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: number;
  rating: number;
  user_created?: UserResponse;
  user_updated?: UserResponse;
}

 

import { CategoryResponse } from "./category";
import { MediaResponse } from "./media";
import { UserResponse } from "./user";
 

 

export class ProductResponse {
  id: number = 0;
  description: string = "";
  name: string = "";
  price: number = 0;
  original_price: number = 0;
  stock: number = 0;
  is_have_size: boolean = false;
  user_created: UserResponse = new UserResponse();
  user_updated: UserResponse = new UserResponse();
  created_at: string = "";
  updated_at: string = "";
  status: number = 0;
  // media: MediaResponse = new MediaResponse();
  media_id: number = 0;
  category : CategoryResponse = new CategoryResponse()
  media_default: MediaResponse = new MediaResponse();
  media: MediaResponse[] = [];
  unit: string = "";
  discount: number = 0;
  quantity: number = 0;
  rating: number = 0;


  constructor(data?: Partial<ProductResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

 
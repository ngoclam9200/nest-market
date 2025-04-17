import { MediaResponse } from "./media";
import { UserResponse } from "./user";

export class BannerResponse {
  id: number = 0;
  description: string = "";
  name: string = "";
  title: string = "";
  user_created: UserResponse = new UserResponse();
  user_updated: UserResponse = new UserResponse();
  created_at: string = "";
  updated_at: string = "";
  media: MediaResponse = new MediaResponse();
  media_id: number = 0;
  code: string = "";
  status: number = 1;

  constructor(data?: Partial<BannerResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

import { MediaResponse } from "./media";
import { UserResponse } from "./user";

export class UserAddressResponse {
  id: number = 0;
  address: string = "";
  ward_code: string = "";
  province_id: number = 0;
  district_id: number = 0;
  user: UserResponse = new UserResponse();
  is_default: boolean = false;
  user_id: number = 0;

  constructor(data?: Partial<UserAddressResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

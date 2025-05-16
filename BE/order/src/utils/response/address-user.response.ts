import { UserResponse } from './user.response';

export class AddressUserResponse {
  id: number = 0;
  address: string = '';
  province_id: number = 0;
  district_id: number = 0;
  ward_code: string = '';
  user?: UserResponse = new UserResponse();
  is_default: boolean = false;

  constructor(data?: Partial<AddressUserResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

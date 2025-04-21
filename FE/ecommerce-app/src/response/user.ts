import { GenderTypeEnum } from "../enums/Enum";

export class UserResponse {
  id: string = "";
  roles: string[] = [];
  email: string = "";
  username: string = "";
  phonenumber: string = "";
  avatar: string = "";
  created_at: string = "";
  updated_at: string = "";
  gender: GenderTypeEnum = 1; // Assuming MALE is a default value in your enum
  status: boolean = true;
  access_token: string = "";

  constructor(data?: Partial<UserResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

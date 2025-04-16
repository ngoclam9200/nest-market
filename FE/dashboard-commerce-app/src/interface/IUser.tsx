import { GenderTypeEnum } from "../enums/Enum";

export interface IUser {
  id: string;
  roles: string[];
  email: string;
  username: string;
  phonenumber: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  gender: GenderTypeEnum;
  status: boolean;
  branch_id: string;
  access_token: string;
}

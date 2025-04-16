import { GenderTypeEnum } from "../enums/Enum";

export interface IUser {
  id: string;
  roles: string[];
  email: string;
  username: string;
  phonenumber: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  gender: GenderTypeEnum;
  isDelete: boolean;
  access_token: string;
}

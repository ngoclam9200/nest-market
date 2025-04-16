import { IMedia } from "./IMedia";
import { IUser } from "./IUser";

export interface ICategory {
  id: number;
  description: string;
  name: string;
  parent_id: number;
  parent?: ICategory;
  user_created: IUser;
  user_updated: IUser;
  created_at: string;
  updated_at: string;
  media: IMedia;
  media_id: number;
  code: string;
  status: number;
}

export interface CategoriesState {
  listParentCategories: ICategory[];
  listChildCategories: {
    [parentId: number]: {
      totalRecord: number;
      currentPage: number;
      [page: number]: ICategory[];
    };
  };
  isWaitingCallApi: boolean;
  currentParentCategories: ICategory | null;
  currentChildCategories: ICategory[] | null;
  totalRecord: number;
  categoryAdded: ICategory | null;
}

export const initialState: CategoriesState = {
  listParentCategories: [],
  listChildCategories: {},
  isWaitingCallApi: true,
  currentParentCategories: null,
  currentChildCategories: [],
  totalRecord: 0,
  categoryAdded: null,
};

export interface RootState {
  categories: CategoriesState;
}

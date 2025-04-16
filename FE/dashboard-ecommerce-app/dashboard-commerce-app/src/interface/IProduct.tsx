import { IMedia } from "./IMedia";
import { IUser } from "./IUser";

export interface IProduct {
  id: number;
  description: string;
  name: string;
  price: number;
  original_price: number;
  count: number;
  stock: number;
  is_have_size: boolean;
  user_created: IUser;
  user_updated: IUser;
  created_at: string;
  updated_at: string;
  status: boolean;
  media: IMedia;
  media_id: number;
}

export interface ProductsState {
  storeProducts: {
    [page: number]: IProduct[];
  };
  currentListProduct: IProduct[];
  isWaitingCallApi: boolean;
  totalRecord: number;
}

export const initialState: ProductsState = {
  storeProducts: {},
  currentListProduct: [],
  isWaitingCallApi: true,
  totalRecord: 0,
};

export interface RootState {
  products: ProductsState;
}

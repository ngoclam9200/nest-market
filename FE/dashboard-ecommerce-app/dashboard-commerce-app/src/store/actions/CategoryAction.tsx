import { ICategory } from "../../interface/ICategory";

export const SET_PARENT_CATEGORIES = "SET_PARENT_CATEGORIES";
export const SET_STORE_CHILD_CATEGORIES = "SET_STORE_CHILD_CATEGORIES";
export const SET_WAITING_CALL_API = "SET_WAITING_CALL_API";
export const SET_CURRENT_PARENT_CATEGORIES = "SET_CURRENT_PARENT_CATEGORIES";
export const SET_LIST_CURRENT_CHILD_CATEGORIES =
  "SET_LIST_CURRENT_CHILD_CATEGORIES";
export const SET_TOTAL_RECORD_LIST_CHILD_CATEGORIES =
  "SET_TOTAL_RECORD_LIST_CHILD_CATEGORIES";
export const ADD_CATEGORIES = "ADD_CATEGORIES";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";

// Các kiểu dữ liệu cho action
interface SetListCategoriesAction {
  type: typeof SET_PARENT_CATEGORIES | typeof SET_LIST_CURRENT_CHILD_CATEGORIES;
  payload: ICategory[];
}


interface SetTotalRecordListChildCategoriesAction {
  type: typeof SET_TOTAL_RECORD_LIST_CHILD_CATEGORIES;
  payload: number;
}

interface SetChildCategoriesAction {
  type: typeof SET_STORE_CHILD_CATEGORIES;
  payload: {
    parentId: number;
    page: number;
    categories: ICategory[];
    total: number;
  };
}

interface SetWaitingCallApiAction {
  type: typeof SET_WAITING_CALL_API;
  payload: boolean;
}

interface SetCategoryAction {
  type: typeof SET_CURRENT_PARENT_CATEGORIES | typeof ADD_CATEGORIES;
  payload: ICategory | null;
}

interface AddCategoryAction {
  type: typeof ADD_CATEGORIES;
  payload: {
    categories: ICategory;
  };
}
interface UpdateCategoryAction {
  type: typeof UPDATE_CATEGORIES;
  payload: {
    categories: ICategory;
    page:number;
  };
}

export type CategoriesActionTypes =
  | SetListCategoriesAction
  | SetWaitingCallApiAction
  | SetCategoryAction
  | AddCategoryAction
  | UpdateCategoryAction
  | SetTotalRecordListChildCategoriesAction
  | SetChildCategoriesAction;

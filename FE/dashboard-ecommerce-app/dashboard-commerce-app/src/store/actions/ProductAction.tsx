// import { IProduct } from "../../interface/IProduct";

// // ProductAction.ts
// export const SET_STORE_PRODUCTS = "SET_STORE_PRODUCTS";
// export const SET_CURRENT_LIST_PRODUCT = "SET_CURRENT_LIST_PRODUCT";
// export const ADD_PRODUCT = "ADD_PRODUCT";
// export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
// export const SET_WAITING_CALL_API = "SET_WAITING_CALL_API";
// export const SET_TOTAL_RECORD = "SET_TOTAL_RECORD";

// // Các kiểu dữ liệu cho action
// interface SetProductsAction {
//   type: typeof SET_STORE_PRODUCTS;
//   payload: {
//     products: IProduct[];
//     page: number;
//   };
// }

// interface SetCurrentListProduct {
//   type: typeof SET_CURRENT_LIST_PRODUCT;
//   payload: IProduct[];
// }

// interface AddProductAction {
//   type: typeof ADD_PRODUCT;
//   payload: IProduct;
// }

// interface UpdateProductAction {
//   type: typeof UPDATE_PRODUCT;
//   payload: IProduct;
// }

// interface SetWaitingCallApiAction {
//   type: typeof SET_WAITING_CALL_API;
//   payload: boolean;
// }

// interface SetTotalRecordAction {
//   type: typeof SET_TOTAL_RECORD;
//   payload: number;
// }

// export type ProductActionTypes =
//   | SetProductsAction
//   | SetCurrentListProduct
//   | AddProductAction
//   | UpdateProductAction
//   | SetTotalRecordAction
//   | SetWaitingCallApiAction;

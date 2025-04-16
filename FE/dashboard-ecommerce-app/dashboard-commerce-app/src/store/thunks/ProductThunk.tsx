// import { Dispatch } from "react";
// import {
//   ADD_PRODUCT,
//   ProductActionTypes,
//   SET_CURRENT_LIST_PRODUCT,
//   SET_STORE_PRODUCTS,
//   SET_TOTAL_RECORD,
//   SET_WAITING_CALL_API,
// } from "../actions/ProductAction";
// import { AppState } from "../store";
// import { getListProduct } from "../../services/Product/product-service";
// import { IProduct } from "../../interface/IProduct";

// export const fetchListProduct = (page: number, limit: number) => {
//   return async (dispatch: Dispatch<ProductActionTypes>, getState: () => AppState) => {
//     try {
//       if (getState().products.storeProducts[page]) {
//         const listCurrentProduct = getState().products.storeProducts[page];
//         if (listCurrentProduct && listCurrentProduct.length > 0) {
//           dispatch({
//             type: SET_CURRENT_LIST_PRODUCT,
//             payload: listCurrentProduct,
//           });
//           return;
//         }
//       }

//       dispatch({
//         type: SET_WAITING_CALL_API,
//         payload: true,
//       });
//       const response = await getListProduct({
//         page: page,
//         limit: limit,
//       });
//       dispatch({
//         type: SET_STORE_PRODUCTS,
//         payload: {
//           page,
//           products: response.data.list,
//         },
//       });
//       dispatch({
//         type: SET_TOTAL_RECORD,
//         payload: response.data.total_record,
//       });
//     } catch (error) {
//       console.error("Failed to fetch child categories:", error);
//     } finally {
//       dispatch({
//         type: SET_WAITING_CALL_API,
//         payload: false,
//       });
//     }
//   };
// };

// export const addProduct = (product: IProduct) => {
//   return async (dispatch: Dispatch<ProductActionTypes>) => {
//     try {
//       dispatch({
//         type: ADD_PRODUCT,
//         payload: product,
//       });
//     } catch (error) {
//       console.error("Failed to fetch child categories:", error);
//     }
//   };
// };

// // export const updateProductStore = (category: IProduct, page: number) => {
// //   return async (dispatch: Dispatch<CategoriesActionTypes>) => {
// //     try {
// //       dispatch({
// //         type: UPDATE_PRODUCT,
// //         payload: {
// //           categories: category,
// //           page: page,
// //         },
// //       });
// //     } catch (error) {
// //       console.error("Failed to fetch child categories:", error);
// //     }
// //   };
// // };

// import { Dispatch } from "react";
// import {
//   CategoriesActionTypes,
//   SET_STORE_CHILD_CATEGORIES,
//   SET_CURRENT_PARENT_CATEGORIES,
//   SET_PARENT_CATEGORIES,
//   SET_WAITING_CALL_API,
//   SET_LIST_CURRENT_CHILD_CATEGORIES,
//   SET_TOTAL_RECORD_LIST_CHILD_CATEGORIES,
//   ADD_CATEGORIES,
//   UPDATE_CATEGORIES,
// } from "../actions/CategoryAction";
// import {
//   getCategoryWithCode,
//   getListChildCategory,
//   getListParentCategory,
// } from "../../services/Category/category-service";
// import { ICategory } from "../../interface/ICategory";
// // import { AppState } from "../store";
// import { getCookie } from "../../services/cookie";

// export const fetchParentCategories = () => {
//   return async (dispatch: Dispatch<CategoriesActionTypes>, getState: () => AppState) => {
//     try {
//       dispatch({
//         type: SET_LIST_CURRENT_CHILD_CATEGORIES,
//         payload: [],
//       });
//       const listParentCategories = getState().categories.listParentCategories;
//       if (listParentCategories.length > 0) return;
//       dispatch({
//         type: SET_WAITING_CALL_API,
//         payload: true,
//       });


//       const response = await getListParentCategory({
//         status: -1,
//
//       });
//       dispatch({
//         type: SET_PARENT_CATEGORIES,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error("Failed to fetch parent categories:", error);
//     } finally {
//       dispatch({
//         type: SET_WAITING_CALL_API,
//         payload: false,
//       });
//     }
//   };
// };

// export const fetchChildCategories = (parentId: number, page: number, limit: number) => {
//   return async (dispatch: Dispatch<CategoriesActionTypes>, getState: () => AppState) => {
//     try {
//       if (getState().categories.listChildCategories[parentId]) {
//         const listChildCategories = getState().categories.listChildCategories[parentId][page];
//         const totalRecord = getState().categories.listChildCategories[parentId].totalRecord;

//         if (listChildCategories && listChildCategories.length > 0) {
//           dispatch({
//             type: SET_LIST_CURRENT_CHILD_CATEGORIES,
//             payload: listChildCategories,
//           });
//           dispatch({
//             type: SET_TOTAL_RECORD_LIST_CHILD_CATEGORIES,
//             payload: totalRecord,
//           });
//           return;
//         }
//       }

//       dispatch({
//         type: SET_WAITING_CALL_API,
//         payload: true,
//       });
//       const response = await getListChildCategory({
//         parent_id: parentId,
//
//         page: page,
//         limit: limit,
//       });
//       dispatch({
//         type: SET_STORE_CHILD_CATEGORIES,
//         payload: {
//           parentId,
//           page,
//           categories: response.data.list,
//           total: response.data.total_record,
//         },
//       });
//       dispatch({
//         type: SET_LIST_CURRENT_CHILD_CATEGORIES,
//         payload: response.data.list,
//       });
//       dispatch({
//         type: SET_TOTAL_RECORD_LIST_CHILD_CATEGORIES,
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

// export const setCurrentCategory = (category: ICategory | null) => {
//   return async (dispatch: Dispatch<CategoriesActionTypes>) => {
//     try {
//       dispatch({
//         type: SET_CURRENT_PARENT_CATEGORIES,
//         payload: category,
//       });
//     } catch (error) {
//       console.error("Failed to fetch child categories:", error);
//     }
//   };
// };

// export const setIsWaitingCallApi = (isWaiting: boolean) => {
//   return async (dispatch: Dispatch<CategoriesActionTypes>) => {
//     try {
//       dispatch({
//         type: SET_WAITING_CALL_API,
//         payload: isWaiting,
//       });
//     } catch (error) {
//       console.error("Failed to fetch child categories:", error);
//     }
//   };
// };

// export const fetchCurrentCategory = (code: string) => {
//   return async (dispatch: Dispatch<CategoriesActionTypes>) => {
//     try {
//       dispatch({
//         type: SET_WAITING_CALL_API,
//         payload: true,
//       });
//       console.log(code);

//       const response = await getCategoryWithCode(code);

//       dispatch({
//         type: SET_CURRENT_PARENT_CATEGORIES,
//         payload: response.data,
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

// export const addCategory = (category: ICategory) => {
//   return async (dispatch: Dispatch<CategoriesActionTypes>) => {
//     try {
//       dispatch({
//         type: ADD_CATEGORIES,
//         payload: {
//           categories: category,
//         },
//       });
//     } catch (error) {
//       console.error("Failed to fetch child categories:", error);
//     }
//   };
// };

// export const updateCategoryStore = (category: ICategory, page: number) => {
//   return async (dispatch: Dispatch<CategoriesActionTypes>) => {
//     try {
//       dispatch({
//         type: UPDATE_CATEGORIES,
//         payload: {
//           categories: category,
//           page: page,
//         },
//       });
//     } catch (error) {
//       console.error("Failed to fetch child categories:", error);
//     }
//   };
// };

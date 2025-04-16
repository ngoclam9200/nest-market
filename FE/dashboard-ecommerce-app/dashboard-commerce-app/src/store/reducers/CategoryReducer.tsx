// import { CategoriesState, initialState } from "../../interface/ICategory";
// import {
//   SET_STORE_CHILD_CATEGORIES,
//   SET_PARENT_CATEGORIES,
//   SET_WAITING_CALL_API,
//   SET_CURRENT_PARENT_CATEGORIES,
//   SET_LIST_CURRENT_CHILD_CATEGORIES,
//   SET_TOTAL_RECORD_LIST_CHILD_CATEGORIES,
//   ADD_CATEGORIES,
//   UPDATE_CATEGORIES,
// } from "../actions/CategoryAction";

// const LIMIT = 2;

// const categoriesReducer = (
//   state = initialState,
//   action: any
// ): CategoriesState => {
//   switch (action.type) {
//     case SET_CURRENT_PARENT_CATEGORIES:
//       return {
//         ...state,
//         currentParentCategories: action.payload,
//       };
//     case SET_LIST_CURRENT_CHILD_CATEGORIES:
//       return {
//         ...state,
//         currentChildCategories: action.payload,
//         totalRecord: action.payload,
//       };
//     case SET_TOTAL_RECORD_LIST_CHILD_CATEGORIES:
//       return {
//         ...state,
//         totalRecord: action.payload,
//       };
//     case SET_WAITING_CALL_API:
//       return {
//         ...state,
//         isWaitingCallApi: action.payload,
//       };
//     case SET_PARENT_CATEGORIES:
//       return {
//         ...state,
//         listParentCategories: action.payload,
//       };
//     case SET_STORE_CHILD_CATEGORIES:
//       const { parentId, page, categories, total } = action.payload;
//       return {
//         ...state,
//         listChildCategories: {
//           ...state.listChildCategories,
//           [parentId]: {
//             ...state.listChildCategories[parentId],
//             [page]: categories,
//             totalRecord: total,
//             currentPage: page,
//           },
//         },
//       };
//     case ADD_CATEGORIES:
//       if (action.payload.categories.parent_id) {
//         const { categories } = action.payload;
//         const parent_id = categories.parent_id;
//         let pageStart = 1;
//         let remainingCategories = [categories];
//         if (!state.listChildCategories[parent_id]) {
//           return {
//             ...state,
//             categoryAdded: categories,
//             currentParentCategories: categories.parent,
//           };
//         }

//         const currentListChild =
//           state.listChildCategories[parent_id][pageStart] || [];

//         // Kết hợp các danh mục hiện có với các danh mục mới và giới hạn 10
//         const newCurrentListChild = [
//           ...remainingCategories,
//           ...currentListChild,
//         ].slice(0, LIMIT);

//         // Lưu trạng thái ban đầu để dễ dàng cập nhật lại state
//         const updatedChildCategories = {
//           ...state.listChildCategories[parent_id],
//         };

//         while (
//           remainingCategories.length > 0 &&
//           state.listChildCategories[parent_id][pageStart]
//         ) {
//           // Lấy danh sách danh mục hiện tại của trang
//           const existingCategories = updatedChildCategories[pageStart] || [];

//           // Kết hợp các danh mục hiện có với các danh mục mới và giới hạn 10
//           const newCategories = [
//             ...remainingCategories,
//             ...existingCategories,
//           ].slice(0, LIMIT);

//           // Cập nhật danh mục cho trang hiện tại
//           updatedChildCategories[pageStart] = newCategories;

//           // Loại bỏ các danh mục đã thêm vào trang hiện tại khỏi mảng `remainingCategories`
//           remainingCategories = remainingCategories.slice(
//             LIMIT - existingCategories.length
//           );

//           pageStart++;
//         }

//         return {
//           ...state,
//           currentChildCategories: newCurrentListChild,
//           listChildCategories: {
//             ...state.listChildCategories,
//             [parent_id]: {
//               ...updatedChildCategories,
//               totalRecord: state.totalRecord + 1,
//               currentPage: pageStart,
//             },
//           },
//           totalRecord: state.totalRecord + 1,
//         };
//       } else {
//         return {
//           ...state,
//           listParentCategories: [
//             action.payload.categories,
//             ...state.listParentCategories,
//           ],
//         };
//       }
//     case UPDATE_CATEGORIES:
//       {
//         const { categories, page } = action.payload;
//         if (action.payload.categories.parent_id) {
//           const parent_id = categories.parent_id;
//           const updatedChildCategories = {
//             ...state.listChildCategories,
//           };

//           if (updatedChildCategories[parent_id]) {
//             updatedChildCategories[parent_id] = {
//               ...updatedChildCategories[parent_id],
//               [page]: updatedChildCategories[parent_id][page].map((cat) =>
//                 cat.id === categories.id ? categories : cat
//               ),
//             };
//           }

//           return {
//             ...state,
//             listChildCategories: updatedChildCategories,
//             currentChildCategories: updatedChildCategories[parent_id][page],
//           };
//         } else {
//           const updatedParentCategories = state.listParentCategories.map(
//             (cat) => (cat.id === categories.id ? categories : cat)
//           );
//           return {
//             ...state,
//             listParentCategories: updatedParentCategories,
//           };
//         }
//       }

//     default:
//       return state;
//   }
// };

// export default categoriesReducer;

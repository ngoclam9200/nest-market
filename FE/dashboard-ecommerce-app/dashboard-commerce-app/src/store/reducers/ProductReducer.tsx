// // productReducer.ts
// import {
//   SET_STORE_PRODUCTS,
//   ADD_PRODUCT,
//   UPDATE_PRODUCT,
//   SET_WAITING_CALL_API,
//   SET_TOTAL_RECORD,
// } from "../actions/ProductAction";
// import { ProductsState, initialState } from "../../interface/IProduct";

// const productsReducer = (state = initialState, action: any): ProductsState => {
//   switch (action.type) {
//     case SET_STORE_PRODUCTS:
//       const { page, products } = action.payload;
//       return {
//         ...state,
//         storeProducts: {
//           ...state.storeProducts,
//           [page]: products,
//         },
//         currentListProduct: products,
//       };
//     case ADD_PRODUCT:
//       return {
//         ...state,
//         storeProducts: {
//           ...state.storeProducts,
//           [1]: [...state.storeProducts[1], action.payload],
//         },
//         currentListProduct: state.storeProducts[1],
//       };
//     // case UPDATE_PRODUCT:
//     //   return {
//     //     ...state,
//     //     products: state.products.map((product) =>
//     //       product.id === action.payload.id ? action.payload : product
//     //     ),
//     //   };
//     case SET_WAITING_CALL_API:
//       return {
//         ...state,
//         isWaitingCallApi: action.payload,
//       };
//     case SET_TOTAL_RECORD:
      
//       return {
//         ...state,
//         totalRecord: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default productsReducer;

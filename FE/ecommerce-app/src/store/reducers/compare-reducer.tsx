import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductResponse } from "../../response/product";

// Export the CompareItem interface
export interface CompareItem {
  product: ProductResponse;
}

// Export the CompareState interface
export interface CompareState {
  itemsCompare: CompareItem[];
  maxitemsCompare: number; // Maximum number of itemsCompare that can be compared
}

const initialState: CompareState = {
  itemsCompare: [],
  maxitemsCompare: 4, // Allow comparing up to 4 products
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<ProductResponse>) => {
      // Check if product already exists in compare list
      const product = action.payload;
      state.itemsCompare.push({ product });
      // Check if we've reached the maximum number of itemsCompare
    },

    removeFromCompare: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.itemsCompare = state.itemsCompare.filter((item) => item.product.id !== productId);
    },

    clearCompare: (state) => {
      state.itemsCompare = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;

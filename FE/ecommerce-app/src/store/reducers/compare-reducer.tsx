import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductResponse } from "../../response/product";

interface CompareState {
  itemCompare: ProductResponse[];
}

const initialState: CompareState = {
  itemCompare: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<ProductResponse>) => {
      // Limit to 4 products maximum
      if (state.itemCompare.length < 4) {
        state.itemCompare.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<number>) => {
      state.itemCompare = state.itemCompare.filter((item) => item.id !== action.payload);
    },
    clearCompare: (state) => {
      state.itemCompare = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;

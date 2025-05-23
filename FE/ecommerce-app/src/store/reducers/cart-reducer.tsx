import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductResponse } from "../../response/product";

// Export the CartItem interface
export interface CartItem {
  product: ProductResponse;
  quantity: number;
}

// Export the CartState interface
export interface CartState {
  itemsCart: CartItem[];
  totalItemCarts: number;
  totalPriceCart: number;
}

const initialState: CartState = {
  itemsCart: [],
  totalItemCarts: 0,
  totalPriceCart: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: ProductResponse; quantity: number }>) => {
      const { product, quantity } = action.payload;

      const existingItem = state.itemsCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.itemsCart.push({ product, quantity });
      }

      // Update totals
      state.totalItemCarts = state.itemsCart.reduce((total, item) => total + item.quantity, 0);
      state.totalPriceCart = state.itemsCart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.itemsCart = state.itemsCart.filter((item) => item.product.id !== productId);

      // Update totals
      state.totalItemCarts = state.itemsCart.reduce((total, item) => total + item.quantity, 0);
      state.totalPriceCart = state.itemsCart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    },

    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.itemsCart.find((item) => item.product.id === productId);

      if (item) {
        item.quantity = quantity;
      }

      // Update totals
      state.totalItemCarts = state.itemsCart.reduce((total, item) => total + item.quantity, 0);
      state.totalPriceCart = state.itemsCart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    },

    clearCart: (state) => {
      state.itemsCart = [];
      state.totalItemCarts = 0;
      state.totalPriceCart = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

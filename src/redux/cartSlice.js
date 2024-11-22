import { createSlice } from "@reduxjs/toolkit";

// Initial cart state
const initialState = {
  items: []
  // JSON.parse(localStorage.getItem('cart')) || [], // Load cart items from localStorage if available
};

// Create slice for cart management
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart (if not already in cart, else increase quantity)
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      // console.log("====",action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item is already in cart
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        // console.log("====Push",{...action.payload}) // Add new item with quantity 1
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // Save cart to localStorage
    },

    // Remove product from cart based on product ID
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items)); // Save cart to localStorage
    },

    // Increment quantity of item in cart
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      
      if (item) {
        item.quantity += 1;
        if(item.quantity > 10){
          item.quantity = 10;
          alert("Maximum quantity you can add for this product is 10");
          localStorage.setItem("cart", JSON.stringify(state.items))
        }else if(item.quantity < 10){
          localStorage.setItem("cart", JSON.stringify(state.items)); // Save cart to localStorage
        }
      }
    },

    // Decrement quantity of item in cart
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          
          state.items = state.items.filter(item => item.id !== action.payload);
        }
        localStorage.setItem("cart", JSON.stringify(state.items)); // Save cart to localStorage
      }
    },

    
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items)); // Save empty cart to localStorage
    },
  },
});


export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

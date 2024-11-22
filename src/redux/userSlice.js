import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  user : '',
  // user: JSON.parse(localStorage.getItem("user")) || null, // Load from localStorage if available
  loading: false,
  login:false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.login = true
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); 
      localStorage.removeItem("cart")
      // Remove user from localStorage
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchData:(state,action) => {
      state.search = action.payload;
      state.loading = false
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  searchData
} = userSlice.actions;

export default userSlice.reducer;

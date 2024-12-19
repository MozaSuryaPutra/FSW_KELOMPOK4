import { createSlice } from "@reduxjs/toolkit";

// Default (initial) state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

// Slice action and reducer
export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
      state.user = action.payload;
      // Simpan user ke localStorage
      // if (action.payload) {
      //   localStorage.setItem("user", JSON.stringify(action.payload));
      // } else {
      //   localStorage.removeItem("user");
      // }
    },
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
      state.token = action.payload;
    },
  },
});

// Export the action
export const { setToken, setUser } = authSlice.actions;

// Export the state/reducers
export default authSlice.reducer;

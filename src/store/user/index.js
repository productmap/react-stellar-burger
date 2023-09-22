import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload["accessToken"]);
      localStorage.setItem("refreshToken", action.payload["refreshToken"]);
    },
    checkUserAuth() {},
    logout() {
      localStorage.clear();
      return initialState;
    },
  },
});

export const { setUser, checkUserAuth, logout } = userSlice.actions;
export default userSlice.reducer;

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
    reAuthUser(state, action) {
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
    },
    renewToken(state, action) {
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload["accessToken"]);
      localStorage.setItem("refreshToken", action.payload["refreshToken"]);
    },
    logout() {
      localStorage.clear();
      return initialState;
    },
  },
});

export const { setUser, reAuthUser, renewToken, logout } = userSlice.actions;
export default userSlice.reducer;

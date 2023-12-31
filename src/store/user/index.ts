import { createSlice } from "@reduxjs/toolkit";

type TUser = {
  isAuthenticated: boolean;
  currentUser: {
    name: string;
    email: string;
  };
};

const initialState: TUser = {
  isAuthenticated: false,
  currentUser: {
    name: "",
    email: "",
  },
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
    logout() {
      localStorage.clear();
      return initialState;
    },
  },
});

export const { setUser, reAuthUser, logout } = userSlice.actions;
export default userSlice.reducer;

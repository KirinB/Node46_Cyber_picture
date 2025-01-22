import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).user
    : null,
  token: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).tokens
    : null,
};

const userSlice = createSlice({
  name: "inforUser",
  initialState,
  reducers: {
    handleUpdateUser: (state, action) => {
      state.user = action.payload;
    },
    handleUpdateToken: (state, action) => {
      state.token = action.payload;
    },
    handleLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { handleUpdateUser, handleLogout, handleUpdateToken } =
  userSlice.actions;

export default userSlice.reducer;

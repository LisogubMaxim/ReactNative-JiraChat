import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: null,
    refresh_token: null,
    isLoggedIn: false,
    cloudId: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;

      state.isLoggedIn = true;
    },
    setCloudId: (state, action) => {
      state.cloudId = action.payload;
    },
    clearToken: (state) => {
      state.access_token = null;
      refresh_token = null;
      state.isLoggedIn = false;
      state.cloudId = null;
    },
  },
});

export const { setToken, setCloudId, clearToken } = authSlice.actions;
export default authSlice.reducer;

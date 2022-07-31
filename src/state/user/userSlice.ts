import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  username: string;
  userId: string;
}

export interface UserState {
  data: UserData | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
    userLoggedOut: (state) => {
      state.data = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;

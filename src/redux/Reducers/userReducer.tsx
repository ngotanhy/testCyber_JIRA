import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoreJSON, http, USER_LOGIN } from "../../utils/setting";

export interface user {
  id: string
  passWord: string
  email: string
  name: string
  phoneNumber: string
}

export interface userRegister{
  email: string,
  passWord: string,
  name: string,
  phoneNumber: string
}


export interface userLogin {
  email: string
  passWord: string
}


export interface userLoginState {
  userLogin: userLogin | any;
}

const initialState: userLoginState = {
  userLogin: getStoreJSON(USER_LOGIN) || null,
};

const userAdminReducer = createSlice({
  name: "userAdminReducer",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<user>) => {
      state.userLogin = action.payload;
    },
  },
});

export const {
} = userAdminReducer.actions;

export default userAdminReducer.reducer;

//-------action api------------

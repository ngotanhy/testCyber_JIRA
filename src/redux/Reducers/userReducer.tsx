import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoreJSON, http, USER_LOGIN } from "../../utils/setting";
import { AppDispatch } from "../configStore";

export interface user {
  avatar: string;
  email: string;
  name: string;
  phoneNumber: string;
  userId: number;
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
  userAll:user[];
}

const initialState: userLoginState = {
  userLogin: getStoreJSON(USER_LOGIN) || null,
  userAll:[]
};

const userAdminReducer = createSlice({
  name: "userAdminReducer",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<user>) => {
      state.userLogin = action.payload;
    },
    getAllUser:(state,action:PayloadAction<user[]>)=>{
      state.userAll= action.payload
    },
  },
});

export const {getAllUser,getUser
} = userAdminReducer.actions;

export default userAdminReducer.reducer;

//-------action api------------


export const getAllUserApi=()=>{
   return async(dispatch: AppDispatch)=>{
    let result = await http.get("/Users/getUser");
    let listUser = result.data.content;
    // console.log(listUser)

    const action = getAllUser(listUser);
    dispatch(action);
   }
}
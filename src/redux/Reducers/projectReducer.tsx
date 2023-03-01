import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../utils/setting";
import { AppDispatch } from "../configStore";

export interface project {
  members: [];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

export interface arrProject {
  arrProject: project[];
}

const initialState: arrProject = {
  arrProject: [],
};

const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    getAllProject: (state, action: PayloadAction<project[]>) => {
      state.arrProject = action.payload;
    },
    // setUserUpdate: (state: arrUser, action: PayloadAction<user[]>) => {
    //   state.userUpdate = action.payload;
    // },

    // userChangeAvatar: (state: arrUser, action: PayloadAction<user>) => {
    //   state.userAvatar = action.payload;
    // },
  },
});

export const { getAllProject } = projectReducer.actions;

export default projectReducer.reducer;

//-------action api------------

export const getAllProjectManager = () => {
  console.log("a");
  return async (dispatch: AppDispatch) => {
    const result = await http.get("/Project/getAllProject");
    let listProject = result.data.content;
    const action = getAllProject(listProject);
    dispatch(action);
  };
};

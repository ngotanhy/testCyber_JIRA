import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../utils/setting";
import { AppDispatch } from "../configStore";

export type Status = {
  statusId: number | string;
  statusName: string;
  alias: string;
  deleted: boolean;
};

export type TaskType = {
  id: number | string;
  taskType: string;
};

export type Priority = {
  priorityId: number | string;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
};

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
  status:Status[];
  taskType:TaskType[];
  priority:Priority[];
}

const initialState: arrProject = {
  arrProject: [],
  status:[],
  taskType:[],
  priority:[]
};

const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    getAllProject: (state, action: PayloadAction<project[]>) => {
      state.arrProject = action.payload;
    },

    getStatus: (state, action: PayloadAction<Status[]>) => {
      state.status = action.payload;
    },

    getTaskType: (state, action: PayloadAction<TaskType[]>) => {
      state.taskType = action.payload;
    },

    getPriority: (state, action: PayloadAction<Priority[]>) => {
      state.priority = action.payload;
    },
  },
});

export const { getAllProject,getStatus,getTaskType,getPriority } = projectReducer.actions;

export default projectReducer.reducer;

//-------action api------------

export const getAllProjectManager = () => {
  return async (dispatch: AppDispatch) => {
    const result = await http.get("/Project/getAllProject");
    let listProject = result.data.content;
    const action = getAllProject(listProject);
    dispatch(action);
  };
};


export const getAllStatus =  () => {
  return async (dispatch: AppDispatch) => {
    let result = await http.get("/Status/getAll");
    let listStatus = result.data.content;
    const action = getStatus(listStatus);
    dispatch(action);
  };
}

export const getAllTaskType =  () => {
  return async (dispatch: AppDispatch) => {
    let result = await http.get("/TaskType/getAll");
    let listTask = result.data.content;
    const action = getTaskType(listTask);
    dispatch(action);
  };
};

export const getALLPriority =  () => {
  return async (dispatch: AppDispatch) => {
    let result = await http.get("/Priority/getAll");
    let listPriority = result.data.content;
    const action = getPriority(listPriority);
    dispatch(action);
  };
};
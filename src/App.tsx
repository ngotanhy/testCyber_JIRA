import React, { lazy, Suspense, useEffect, useState } from "react";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

//cai history npm install --save history
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

//Cấu hình react router dom
export const history = createBrowserHistory({ window });

//ant design
import "antd/dist/antd.css";

//scss
import "react-toastify/dist/ReactToastify.css";

import "../src/assets/scss/style.scss";

import Loading from "./components/Loading/Loading";
import { getStoreJSON, USER_LOGIN } from "./utils/setting";
import {  user, userLogin } from "./redux/Reducers/userReducer";

// ----- Lazy loading --------------------------------

const Login = lazy(() => import("./pages/Login/Login"));
const DashBoard = lazy(() => import("./pages/index/DashBoard"));
const Register = lazy(() => import("./pages/Register/Register"));

const CreateProject = lazy(() => import("./pages/index/CreateProject"));
const UpdateProject = lazy(() => import("./pages/index/UpdateProject"));
const ListProjectManager = lazy(
  () => import("./pages/index/ListProjectManager")
);
const CreateTask = lazy(() => import("./pages/index/CreateTask"));
const UpdateTask = lazy(() => import("./pages/index/UpdateTask"));

type Props = {};

export const toastOptionsErr: {} = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
export const toastOptionsSuccess: {} = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export default function App({}: Props) {
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <HistoryRouter history={history}>
          {/* <RouterProvider router={router} /> */}
          <Routes>
            <Route path="/" element={<DashBoard />}>
              {/* <Route path="DashBoardInfor" element={<DashBoardInfor />} /> */}
              <Route path="/createProject" element={<CreateProject />} />
              <Route path="/updateProject">
                <Route path=":id" element={<UpdateProject />} />
              </Route>
              <Route path="/listProject" element={<ListProjectManager />} />
              <Route path="/createTask" element={<CreateTask />} />
              <Route path="/updateTask" element={<UpdateTask />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </HistoryRouter>
      </Suspense>
    </>
  );
}

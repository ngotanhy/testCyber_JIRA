import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TapNavleft from "./TapNavleft";

type Props = {};

export default function DashBoard({}: Props) {

  return (
    <div className="">
      <div className="grid grid-cols-8 justify-center h-screen">
        <div className="col-span-2 justify-center ">
           <TapNavleft/>
        </div>
        <div className="col-span-6 mt-8 ml-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

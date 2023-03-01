import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import classNames from "classnames";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import HeaderMenu from "./HeaderMenu";

type Props = {};

export default function HeaderPage({}: Props) {
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className=" top-0 right-0 left-0 z-10 bg-white fixed">
        <div className="header py-4">
          <div className="container-dn ">
            <div className="flex items-center justify-between ">
              <div
                className="w-2/12 cursor-pointer sm:block"
                onClick={() => navigate("/")}
              >
                <p className="text-ellipsis font-sans text-2xl text-red-400 font-extrabold">
                  UTHBooking
                </p>
                {/* <img
                  className="w-3/5 h-11"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                  alt=""
                /> */}
              </div>
              <div className=" flex justify-between items-center sm:h-16 ">
                <div className="rounded-full searchBox hidden lg:block">
                  <button
                    className=" py-3 px-4 font-medium"
                    onClick={() => setSearchVisible(!searchVisible)}
                  >
                    Nơi ở
                  </button>
                  <span className="w-px h-6 bg-gray-300 inline-block translate-y-1/4"></span>
                  <button className="py-3 px-4 font-medium">Trải nhiệm</button>
                  <span className="w-px h-6 bg-gray-300 inline-block translate-y-1/4"></span>
                  <button className="py-3 px-4 font-mono text-gray-400 inline-flex items-center hidden sm:inline-block">
                    Trải nhiệm trực tuyến
                    <div className="inline-flex w-8 h-8 p-2 ml-8 rounded-full bg-red-400 items-center ">
                      <FaSearch className="text-white inline-block text-sm " />
                    </div>
                  </button>
                </div>
              </div>
              <div className=" flex justify-end items-center host relative">
                <a
                  href="https://www.airbnb.com.vn/host/homes"
                  target="_blank"
                  className="m-0 text-black hover:text-black hidden lg:block"
                >
                  Đón tiếp khách
                </a>

                {/* ------------------------------------ ------------------------------------------ Testing show language change */}

                <span
                  onClick={() => setShowLanguages(!showLanguages)}
                  className="hidden sm:block"
                >
                  <AiOutlineGlobal className="text-lg" />
                </span>

                <div
                  style={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.3)" }}
                  className={classNames(
                    "w-32 absolute top-14 right-10 bg-white  rounded-md ",
                    {
                      hidden: !showLanguages,
                    }
                  )}
                >
                  <p className="m-0 p-2 hoverDn hover:bg-gray-100">
                    Vietnamese
                  </p>
                  <p className="m-0 p-2 hoverDn hover:bg-gray-100">English</p>
                  <p className="m-0 p-2 hoverDn hover:bg-gray-100">Chinese</p>
                </div>

                {/* -----------------------------------------------------------------------------------/*DropDown Form  */}
                <HeaderMenu />
              </div>
            </div>
          </div>
        </div>

        {/* HeaderSearc */}
        <HeaderSearch
          setSearchVisible={() => setSearchVisible(false)}
          searchVisible={searchVisible}
        />
      </div>
    </>
  );
}

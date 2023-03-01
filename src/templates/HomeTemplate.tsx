import React from "react";
import { Outlet } from "react-router-dom";
import PageFooter from "../components/Footer/PageFooter";
import HeaderPage from "../components/Header/HeaderPages";
import Loading from "../components/Loading/Loading";
import Chat from "../pages/ChatBox/Chat";
import DetailImageModal from "../pages/DetailPages/DetailImage/DetailImageModal/DetailImageModal";
import { CURRENT_USER, getStoreJSON } from "../utils/setting";

type Props = {};

export default function HomeTemplate({}: Props) {
  let currentUser = getStoreJSON(CURRENT_USER);
  return (
    <div className="relative">
      <HeaderPage />
      {currentUser?.role === "USER" ? <Chat /> : ""}
      <Outlet />
      <PageFooter />
      <DetailImageModal />
    </div>
  );
}

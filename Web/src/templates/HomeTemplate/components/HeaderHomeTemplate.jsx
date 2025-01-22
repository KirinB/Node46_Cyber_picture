import React from "react";
import { Icons } from "../../../assets/Icons";
import { Link, NavLink } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import HeaderSearchHomeTemplate from "./HeaderSearchHomeTemplate";
import HeaderBarsHomeTemplate from "./HeaderBarsHomeTemplate";
import { useSelector } from "react-redux";
import { useNotificationContext } from "../../../store/Notification.Context";

const HeaderHomeTemplate = () => {
  const { handleNotification } = useNotificationContext();
  const { user } = useSelector((state) => state.userSlice);
  return (
    <header className="shadow-sm sticky z-50 top-0 bg-white">
      <div className="container p-6 gap-6 flex items-center">
        <div className="flex items-center gap-4">
          <Link to={pathDefault.homePage}>
            <Icons.logo />
          </Link>
          <NavLink
            to={pathDefault.homePage}
            className={({ isActive }) => {
              return `py-2 px-4 rounded-3xl hover:bg-gray-200 ${
                isActive ? `bg-black text-white hover:!bg-black` : ``
              }`;
            }}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to={pathDefault.uploadPage}
            className={({ isActive }) => {
              return `py-2 px-4 rounded-3xl hover:bg-gray-200 ${
                isActive ? `bg-black text-white hover:!bg-black` : ``
              }`;
            }}
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                handleNotification("error", "Vui lòng đăng nhập");
              }
            }}
          >
            Upload
          </NavLink>
        </div>
        <HeaderSearchHomeTemplate />
        <HeaderBarsHomeTemplate />
      </div>
    </header>
  );
};

export default HeaderHomeTemplate;

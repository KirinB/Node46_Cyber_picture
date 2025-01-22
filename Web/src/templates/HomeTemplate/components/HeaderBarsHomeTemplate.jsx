import { Avatar, Modal } from "antd";
import React, { useState } from "react";
import {
  ButtonIcon,
  ButtonPrimary,
} from "../../../components/ui/button/ButtonCustom";
import LoginModal from "../../../components/ui/modal/LoginModal";
import RegisterModal from "../../../components/ui/modal/RegisterModal";
import { IoNotifications, IoChatbubbleEllipses } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { useHeaderContext } from "../../../store/Header.Context";
import { BASE_DOMAIN_API } from "../../../common/constant";
const HeaderBarsHomeTemplate = () => {
  const { user } = useSelector((state) => state.userSlice);
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isRegisterModalOpen,
    setIsRegisterModalOpen,
  } = useHeaderContext();

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <ButtonIcon>
            <IoNotifications fill="#767676" size={20} />
          </ButtonIcon>
          <ButtonIcon>
            <IoChatbubbleEllipses fill="#767676" size={20} />
          </ButtonIcon>
          <ButtonIcon>
            <Link to={pathDefault.userInfoPage}>
              <Avatar
                src={
                  user.anh_dai_dien ? BASE_DOMAIN_API + user.anh_dai_dien : null
                }
                style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              >
                {!user.anh_dai_dien && user.ho_ten.slice(0, 1)}
              </Avatar>
            </Link>
          </ButtonIcon>
        </>
      ) : (
        <>
          <ButtonPrimary
            className={"!bg-gray-200 !text-black hover:!bg-gray-300"}
            onClick={() => {
              setIsLoginModalOpen(true);
            }}
          >
            <span className="font-semibold">Đăng Nhập</span>
          </ButtonPrimary>
          <Modal
            title={""}
            open={isLoginModalOpen}
            footer={null}
            onCancel={() => {
              setIsLoginModalOpen(false);
            }}
          >
            <LoginModal
              setIsRegisterModalOpen={setIsRegisterModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </Modal>
          <ButtonPrimary
            onClick={() => {
              setIsRegisterModalOpen(true);
            }}
          >
            <span className="font-semibold">Đăng ký</span>
          </ButtonPrimary>
          <Modal
            title={""}
            open={isRegisterModalOpen}
            footer={null}
            onCancel={() => {
              setIsRegisterModalOpen(false);
            }}
          >
            <RegisterModal
              setIsRegisterModalOpen={setIsRegisterModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default HeaderBarsHomeTemplate;

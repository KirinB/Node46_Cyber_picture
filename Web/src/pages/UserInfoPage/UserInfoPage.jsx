import { Avatar, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonPrimary } from "../../components/ui/button/ButtonCustom";
import { useNotificationContext } from "../../store/Notification.Context";
import SavedImageUploadedUserInfo from "./components/SavedImageUploadedUserInfo";
import ModalUpdateUser from "./components/ModalUpdateUser";
import { BASE_DOMAIN_API } from "../../common/constant";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { handleLogout } from "../../store/slice/user.slice";

const UserInfoPage = () => {
  const { handleNotification } = useNotificationContext();
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate(pathDefault.homePage);
    }
  }, [user]);
  return (
    <div className="py-10 min-h-screen container">
      <div className="flex flex-col justify-center items-center gap-4">
        <Avatar
          src={user?.anh_dai_dien ? BASE_DOMAIN_API + user?.anh_dai_dien : null}
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          className="w-20 h-20 text-2xl"
        >
          {!user?.anh_dai_dien && user?.ho_ten.slice(0, 1)}
        </Avatar>
        <div className="text-center">
          <h3 className="text-3xl font-semibold">{user?.ho_ten}</h3>
          <p className="text-gray-400">{user?.email.split("@")[0]}</p>
        </div>
        <div className="space-x-2">
          <ButtonPrimary
            onClick={() => {
              dispatch(handleLogout());
              localStorage.removeItem("userInfo");
              navigate(pathDefault.homePage);
            }}
            className={"bg-gray-200 !text-black hover:bg-gray-300"}
          >
            Đăng xuất
          </ButtonPrimary>
          <ButtonPrimary
            onClick={() => {
              setIsModalOpen(true);
            }}
            className={"bg-gray-200 !text-black hover:bg-gray-300"}
          >
            Chỉnh sửa hồ sơ
          </ButtonPrimary>
          <Modal
            title={null}
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <ModalUpdateUser setIsModalOpen={setIsModalOpen} />
          </Modal>
        </div>
      </div>
      <SavedImageUploadedUserInfo />
    </div>
  );
};

export default UserInfoPage;

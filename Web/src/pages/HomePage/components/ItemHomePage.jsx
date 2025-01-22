import React, { useEffect, useState } from "react";
import { BASE_DOMAIN_API } from "../../../common/constant";
import { ButtonPrimary } from "../../../components/ui/button/ButtonCustom";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNotificationContext } from "../../../store/Notification.Context";
import { saveImage } from "../../../services/saveImage.service";
import { pathDefault } from "../../../common/path";
const ItemHomePage = ({ item, getListSavedImage }) => {
  const { user, token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();

  const [listSaveImage, setListSaveImage] = useState([]);

  const navigate = useNavigate();

  // console.log(listSaveImage);
  const isSaved = listSaveImage.some(
    (savedItem) => savedItem.hinh_id === item.hinh_id
  );

  const getListSaveImageForUser = () => {
    saveImage
      .getListSaveImageForUserId(user?.nguoi_dung_id)
      .then((res) => {
        setListSaveImage(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveImage = (pictureId) => {
    if (!user) {
      return handleNotification(
        "error",
        "Vui lòng đăng nhập để thực hiện chức năng"
      );
    }
    const data = {
      userId: user.nguoi_dung_id,
      pictureId: pictureId,
    };

    saveImage
      .create(data, token.accessToken)
      .then((res) => {
        handleNotification("success", res.data.message);
        getListSaveImageForUser();
        if (getListSavedImage) {
          getListSavedImage();
        }
      })
      .catch((err) => {
        handleNotification(err.response.data.message);
        getListSaveImageForUser();
        if (getListSavedImage) {
          getListSavedImage();
        }
      });
  };

  const handleRemoveImage = (pictureId) => {
    if (!user) {
      return handleNotification(
        "error",
        "Vui lòng đăng nhập để thực hiện chức năng"
      );
    }

    saveImage
      .remove(user.nguoi_dung_id, pictureId, token.accessToken)
      .then((res) => {
        handleNotification("success", res.data.message);
        getListSaveImageForUser();
        if (getListSavedImage) {
          getListSavedImage();
        }
      })
      .catch((err) => {
        console.log(err);
        getListSaveImageForUser();
        if (getListSavedImage) {
          getListSavedImage();
        }
      });
  };

  useEffect(() => {
    getListSaveImageForUser();
  }, [user]);

  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => {
        navigate(`/detail/${item.hinh_id}`);
      }}
    >
      <img
        src={`${BASE_DOMAIN_API}${item.duong_dan}`}
        alt=""
        className="w-full rounded-lg shadow-md"
      />

      <div className="absolute top-4 right-4 opacity-0 transition-all duration-200 group-hover:opacity-100">
        <ButtonPrimary
          onClick={(e) => {
            e.stopPropagation();
            if (isSaved) {
              handleRemoveImage(item.hinh_id);
            } else {
              handleSaveImage(item.hinh_id);
            }
          }}
        >
          {isSaved ? "Bỏ Lưu" : "Lưu"}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default ItemHomePage;

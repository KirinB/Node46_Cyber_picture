import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import { MdIosShare } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_DOMAIN_API } from "../../common/constant";
import {
  ButtonIcon,
  ButtonPrimary,
} from "../../components/ui/button/ButtonCustom";
import { imageService } from "../../services/image.service";
import { saveImage } from "../../services/saveImage.service";
import { useNotificationContext } from "../../store/Notification.Context";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import CommentDetailPicture from "./components/CommentDetailPicture";

const DetailPicturePage = () => {
  const { user, token } = useSelector((state) => state.userSlice);

  const { handleNotification } = useNotificationContext();

  const [infoPicture, setInfoPicture] = useState({});
  const [isError, setIsError] = useState(false);
  const [listSaveImage, setListSaveImage] = useState([]);

  const params = useParams();

  const isSaved = listSaveImage.some(
    (savedItem) => savedItem.hinh_id === +params.id
  );

  const getListSaveImageForUser = () => {
    saveImage
      .getListSaveImageForUserId(user?.nguoi_dung_id)
      .then((res) => {
        setListSaveImage(res.data.metaData);
        // console.log(res.data.metaData);
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
      pictureId: +pictureId,
    };

    saveImage
      .create(data, token.accessToken)
      .then((res) => {
        handleNotification("success", res.data.message);
        getListSaveImageForUser();
      })
      .catch((err) => {
        handleNotification(err.response.data.message);
        getListSaveImageForUser();
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
      })
      .catch((err) => {
        console.log(err);
        getListSaveImageForUser();
      });
  };

  useEffect(() => {
    imageService
      .getImageForId(+params.id)
      .then((res) => {
        setInfoPicture(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
    getListSaveImageForUser();
  }, []);

  if (!isError) {
    return (
      <div className="container py-10">
        <div className="rounded-3xl shadow-custom grid grid-cols-2">
          <div>
            <img
              src={`${BASE_DOMAIN_API}${infoPicture.duong_dan}`}
              className="rounded-s-3xl w-full"
              alt=""
            />
          </div>
          <div className="p-10 flex-col flex gap-6">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <ButtonIcon>
                  <BsThreeDots size={20} />
                </ButtonIcon>
                <ButtonIcon>
                  <MdIosShare size={20} />
                </ButtonIcon>
                <ButtonIcon>
                  <FaLink size={20} />
                </ButtonIcon>
              </div>
              <div>
                <ButtonPrimary
                  onClick={() => {
                    if (isSaved) {
                      handleRemoveImage(params.id);
                    } else {
                      handleSaveImage(params.id);
                    }
                  }}
                  className={`${isSaved ? "bg-black hover:bg-black/80" : ""} `}
                >
                  {isSaved ? "Bỏ Lưu" : "Lưu"}
                </ButtonPrimary>
              </div>
            </div>
            <div>
              <h4 className="text-gray-500 underline cursor-pointer font-semibold">
                threadless.com
              </h4>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold">{infoPicture.ten_hinh}</h1>
              <p className="text-gray-500">{infoPicture.mo_ta}</p>
            </div>
            <div className="flex gap-6 items-center">
              <Avatar
                src={
                  infoPicture.nguoi_dung?.anh_dai_dien
                    ? BASE_DOMAIN_API + infoPicture.nguoi_dung?.anh_dai_dien
                    : null
                }
                style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                className="w-10 h-10 text-xl"
              >
                {!infoPicture.nguoi_dung?.anh_dai_dien &&
                  infoPicture.nguoi_dung?.ho_ten.slice(0, 1)}
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-semibold">
                  {infoPicture.nguoi_dung?.ho_ten}
                </h3>
                <p className="text-sm text-gray-500">
                  {infoPicture.nguoi_dung?.email.split("@")[0]}
                </p>
              </div>
            </div>
            <CommentDetailPicture pictureId={params.id} />
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFoundPage />;
  }
};

export default DetailPicturePage;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveImage } from "../../../services/saveImage.service";
import { useNotificationContext } from "../../../store/Notification.Context";
import Masonry from "react-masonry-css";
import ItemHomePage from "../../HomePage/components/ItemHomePage";

const SavedImage = () => {
  const { user, token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();

  const [listSavedImage, setListSavedImage] = useState([]);

  const getListSavedImage = () => {
    saveImage.getListSaveImageForUserId(user.nguoi_dung_id).then((res) => {
      setListSavedImage(res.data.metaData);
    });
  };

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  useEffect(() => {
    getListSavedImage();
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-6 py-10"
      columnClassName="space-y-6"
    >
      {listSavedImage.map((item, index) => {
        return (
          <ItemHomePage
            item={item.hinh_anh}
            key={index}
            getListSavedImage={getListSavedImage}
          />
        );
      })}
    </Masonry>
  );
};

export default SavedImage;

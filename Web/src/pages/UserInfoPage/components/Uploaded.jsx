import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNotificationContext } from "../../../store/Notification.Context";
import { imageService } from "../../../services/image.service";
import ItemHomePage from "../../HomePage/components/ItemHomePage";
import Masonry from "react-masonry-css";

const Uploaded = () => {
  const { user, token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();

  const [listUploaded, setListUploaded] = useState([]);

  const getListUploadedForUser = () => {
    imageService
      .getListUploadedForUser(user?.nguoi_dung_id, token?.accessToken)
      .then((res) => {
        setListUploaded(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  useEffect(() => {
    getListUploadedForUser();
  }, []);
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-6 py-10"
      columnClassName="space-y-6"
    >
      {listUploaded.map((item, index) => {
        return <ItemHomePage item={item} key={index} />;
      })}
    </Masonry>
  );
};

export default Uploaded;

import { Tabs } from "antd";
import React from "react";
import Uploaded from "./Uploaded";
import SavedImage from "./SavedImage";

const SavedImageUploadedUserInfo = () => {
  return (
    <div className="py-10">
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            key: "1",
            label: "Đã tạo",
            children: <Uploaded />,
          },
          {
            key: "2",
            label: "Đã lưu",
            children: <SavedImage />,
          },
        ]}
      />
    </div>
  );
};

export default SavedImageUploadedUserInfo;

import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonPrimary } from "../../../components/ui/button/ButtonCustom";
import { InputGhost } from "../../../components/ui/input/InputCustom";
import TextareaCusTom from "../../../components/ui/textarea/TextareaCusTom";
import { useFormik } from "formik";
import { imageService } from "../../../services/image.service";
import { useNotificationContext } from "../../../store/Notification.Context";
import { BASE_DOMAIN_API } from "../../../common/constant";

const FormUploadPage = ({ file, setFile, setPreview }) => {
  const { user, token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ image, title, description, user });
    if (!image || !title || !description || !user) {
      handleNotification("error", "Vui lòng nhập đầy đủ thông tin và hình ảnh");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", user.nguoi_dung_id);
    formData.append("title", title);
    formData.append("description", description);

    imageService
      .upload(formData, token.accessToken)
      .then((res) => {
        handleNotification("success", res.data.message, 3000);
        setFile(null);
        setImage(null);
        setPreview(null);
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setImage(file);
  }, [file]);

  return (
    <form className="space-y-16 px-10 " onSubmit={handleSubmit}>
      <InputGhost
        placeholder={"Tạo tiêu đề"}
        handleChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="flex items-center gap-4">
        <Avatar
          size={"large"}
          src={user.anh_dai_dien ? BASE_DOMAIN_API + user.anh_dai_dien : null}
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
        >
          {!user.anh_dai_dien && user.ho_ten.slice(0, 1)}
        </Avatar>

        <p className="font-semibold">{user?.ho_ten}</p>
      </div>
      <TextareaCusTom
        placeholder={"Mô tả về ảnh"}
        maxLength={1000}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ButtonPrimary type="submit" className={"w-full py-4"}>
        <span className="font-semibold text-lg">Upload</span>
      </ButtonPrimary>
    </form>
  );
};

export default FormUploadPage;

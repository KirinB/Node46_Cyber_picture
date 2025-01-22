import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputWithLabel } from "../../../components/ui/input/InputCustom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";
import { ButtonPrimary } from "../../../components/ui/button/ButtonCustom";
import { userService } from "../../../services/user.service";
import { useNotificationContext } from "../../../store/Notification.Context";
import {
  handleUpdateToken,
  handleUpdateUser,
} from "../../../store/slice/user.slice";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";

const ModalUpdateUser = ({ setIsModalOpen }) => {
  const { user, token } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleNotification } = useNotificationContext();

  const [previewImage, setPreviewImage] = useState(user.anh_dai_dien || null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { handleSubmit, errors, handleBlur, handleChange, touched, values } =
    useFormik({
      initialValues: {
        email: user.email,
        ho_ten: user.ho_ten,
        tuoi: user.tuoi,
      },
      onSubmit: (values) => {
        console.log(values);
        const formData = new FormData();
        formData.append("hoTen", values.ho_ten);
        formData.append("tuoi", values.tuoi);
        if (selectedFile) {
          formData.append("image", selectedFile); // Thêm file vào formData
        }

        // Gửi API
        userService
          .updateUserforId(user.nguoi_dung_id, formData, token.accessToken)
          .then((res) => {
            setIsModalOpen(false);
            handleNotification("success", res.data.message);
            dispatch(handleUpdateUser(res.data.metaData));
            dispatch(handleUpdateToken(token));
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ user: res.data.metaData, token })
            );
          })
          .catch((error) => {
            handleNotification("error", error.response.data.message);
          });
      },
    });
  // Xử lý khi chọn file mới
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Lưu file được chọn
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result); // Tạo preview ảnh
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="py-10 space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Avatar hiển thị preview ảnh */}
        <Avatar
          src={previewImage || user.hinh_dai_dien}
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          className="w-20 h-20 text-2xl"
        >
          {!previewImage || user.ho_ten.slice(0, 1)}
        </Avatar>
        <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 !text-black px-4 py-2 rounded-3xl">
          Thay đổi
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <InputWithLabel
        id={"email"}
        value={values.email}
        handleChange={handleChange}
        touch={touched}
        error={errors.email}
        handleBlur={handleBlur}
        label={"Email"}
        placeholder={"Email"}
        name={"email"}
        disabled={true}
        className={"bg-gray-400 text-white"}
      />
      <InputWithLabel
        id={"ho_ten"}
        value={values.ho_ten}
        handleChange={handleChange}
        touch={touched.ho_ten}
        error={errors.ho_ten}
        handleBlur={handleBlur}
        label={"Họ tên"}
        placeholder={"Họ tên"}
        name={"ho_ten"}
      />
      <InputWithLabel
        id={"tuoi"}
        value={values.tuoi}
        handleChange={handleChange}
        touch={touched}
        error={errors.tuoi}
        handleBlur={handleBlur}
        label={"Tuổi"}
        placeholder={"Tuổi"}
        name={"tuoi"}
        type={"number"}
      />
      {/* Nút submit */}
      <ButtonPrimary type="submit" className={"w-full"}>
        Xác nhận
      </ButtonPrimary>
    </form>
  );
};

export default ModalUpdateUser;

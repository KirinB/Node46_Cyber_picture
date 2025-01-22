import React from "react";
import { Icons } from "../../../assets/Icons";
import { Input } from "antd";
import { ButtonPrimary } from "../button/ButtonCustom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { InputPasswordWithLabel, InputWithLabel } from "../input/InputCustom";
import * as yup from "yup";
import authService from "../../../services/auth.service";
import { useNotificationContext } from "../../../store/Notification.Context";
import { useDispatch } from "react-redux";
import {
  handleUpdateToken,
  handleUpdateUser,
} from "../../../store/slice/user.slice";

const LoginModal = ({ setIsRegisterModalOpen, setIsLoginModalOpen }) => {
  const { handleNotification } = useNotificationContext();
  const dispatch = useDispatch();
  const { handleSubmit, errors, handleBlur, handleChange, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .email("Vui lòng nhập đúng định dạng email"),
        password: yup.string().required("Vui lòng không bỏ trống"),
      }),
      onSubmit: (values) => {
        authService
          .login(values)
          .then((res) => {
            dispatch(handleUpdateUser(res.data.metaData.user));
            dispatch(handleUpdateToken(res.data.metaData.tokens));
            localStorage.setItem("userInfo", JSON.stringify(res.data.metaData));
            handleNotification("success", res.data.message);
            setIsLoginModalOpen(false);
          })
          .catch((error) => {
            handleNotification("error", error.response.data.message);
          });
      },
    });

  return (
    <div className="py-6 space-y-6 px-20">
      <div className="flex flex-col justify-center items-center gap-4">
        <Icons.logo height={50} width={50} />
        <h3 className="text-3xl font-semibold">Đăng nhập</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputWithLabel
          label={"Email"}
          placeholder={"Email"}
          error={errors.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id={"email"}
          name={"email"}
          touch={touched.email}
          value={values.email}
        />
        <InputPasswordWithLabel
          label={"Mật khẩu"}
          placeholder={"Mật khẩu"}
          error={errors.password}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id={"password"}
          name={"password"}
          touch={touched.password}
          value={values.password}
        />
        <ButtonPrimary type="submit" className={"my-4"}>
          Đăng Nhập
        </ButtonPrimary>
      </form>
      <div className="flex flex-col items-center gap-4">
        <p className="text-[12px] text-center">
          Bằng cách tiếp tục, bạn đồng ý với{" "}
          <span className="font-semibold hover:underline cursor-pointer">
            Điều khoản dịch vụ
          </span>{" "}
          của
          <br />
          Pinterest và xác nhận rằng bạn đã đọc
          <br />
          <span className="font-semibold hover:underline cursor-pointer">
            Chính sách quyền riêng tư
          </span>{" "}
          của chúng tôi.
          <br />
          <span className="font-semibold hover:underline cursor-pointer">
            Thông báo khi thu thập
          </span>
          .
        </p>
        <div className="h-px w-1/2 bg-gray-200"></div>
        <div className="text-center">
          <p
            className="font-semibold hover:underline hover:text-current cursor-pointer"
            onClick={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          >
            Chưa tham gia Pinterest? Đăng ký
          </p>
          <br />
          Bạn là doanh nghiệp?{" "}
          <span className="font-semibold hover:underline cursor-pointer">
            Hãy bắt đầu tại đây!
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

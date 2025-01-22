import React from "react";
import { InputPasswordWithLabel, InputWithLabel } from "../input/InputCustom";
import { Icons } from "../../../assets/Icons";
import { ButtonPrimary } from "../button/ButtonCustom";
import { Link } from "react-router-dom";
import { useNotificationContext } from "../../../store/Notification.Context";
import { useFormik } from "formik";
import * as yup from "yup";
import authService from "../../../services/auth.service";

const RegisterModal = ({ setIsRegisterModalOpen, setIsLoginModalOpen }) => {
  const { handleNotification } = useNotificationContext();
  const { handleSubmit, errors, handleBlur, handleChange, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        name: "",
        age: 0,
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .email("Vui lòng nhập đúng định dạng email"),
        password: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .min(6, "Vui lòng nhập mật khẩu hơn 6 ký tự"),
        name: yup.string().required("Vui lòng không bỏ trống"),
        age: yup.number("Vui lòng nhập số"),
      }),
      onSubmit: (values) => {
        authService
          .register(values)
          .then((res) => {
            handleNotification("success", res.data.message);
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          })
          .catch((err) => {
            handleNotification("error", err.response.data.message);
          });
      },
    });

  return (
    <div className="py-6 space-y-6 px-20">
      <div className="flex flex-col justify-center items-center gap-4">
        <Icons.logo height={50} width={50} />
        <h3 className="text-3xl font-semibold">Đăng ký</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputWithLabel
          label={"Họ và tên"}
          placeholder={"Họ và tên"}
          error={errors.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id={"name"}
          name={"name"}
          touch={touched.name}
          value={values.name}
        />
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
        <InputWithLabel
          label={"Tuổi"}
          placeholder={"Tuổi"}
          error={errors.age}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id={"age"}
          name={"age"}
          touch={touched.age}
          value={values.age === 0 ? undefined : values.age}
          type={"number"}
        />
        <ButtonPrimary type="submit" className={"my-4"}>
          Đăng Nhập
        </ButtonPrimary>
      </form>
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <p
            className="font-semibold hover:underline hover:text-current cursor-pointer"
            onClick={() => {
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          >
            Đã có tài khoản rồi?
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;

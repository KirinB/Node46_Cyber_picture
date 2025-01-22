import TextArea from "antd/es/input/TextArea";
import React from "react";

const TextareaCusTom = ({
  maxLength = 100,
  className,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <TextArea
      showCount
      maxLength={maxLength}
      onChange={onChange}
      placeholder={placeholder}
      style={{ height: 120, resize: "none" }}
      value={value}
      className={`w-full ${className}`}
    />
  );
};

export default TextareaCusTom;

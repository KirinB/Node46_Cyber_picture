import React from "react";
import { FaSearch } from "react-icons/fa";

const HeaderSearchHomeTemplate = () => {
  return (
    <div className="flex-1 bg-gray-200 py-3 px-4 flex items-center gap-4 rounded-3xl hover:bg-gray-300">
      <FaSearch fill="#767676" />
      <input
        placeholder="Tìm kiếm"
        className="bg-transparent w-full ring-0 ring-offset-0 border-none outline-none"
      />
    </div>
  );
};

export default HeaderSearchHomeTemplate;

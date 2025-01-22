import React from "react";

const FooterHomeTemplate = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container">
        <span className="text-sm text-gray-500">
          Pinterest clone. Developer:{" "}
          <a
            className="hover:text-blue-300 transition-all duration-300"
            href="https://github.com/KirinB"
            target="blank"
          >
            KirinB
          </a>
        </span>
      </div>
    </footer>
  );
};

export default FooterHomeTemplate;

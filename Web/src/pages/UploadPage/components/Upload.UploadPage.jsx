import React, { useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";

const UploadUploadPage = ({ file, setFile, preview, setPreview }) => {
  const [error, setError] = useState("");

  const handleFileValidation = (uploadedFile) => {
    const validTypes = ["image/jpeg", "image/jpg"];
    const maxSize = 20 * 1024 * 1024;

    if (!validTypes.includes(uploadedFile.type)) {
      setError("Chỉ chấp nhận các file định dạng .jpg, .jpeg, .png, .gif");
      return false;
    }

    if (uploadedFile.size > maxSize) {
      setError("File quá lớn. Vui lòng chọn file dưới 20MB.");
      return false;
    }

    setError("");
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && handleFileValidation(uploadedFile)) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && handleFileValidation(uploadedFile)) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="relative flex flex-col items-center p-4 pb-10 border border-dashed rounded-lg bg-gray-50 text-center max-w-sm mx-auto">
      <div
        className="w-full flex flex-col items-center justify-center border-2 border-dashed h-full rounded-lg bg-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <img
            src={preview}
            alt="Uploaded Preview"
            className="w-full h-full object-cover p-6 rounded-lg"
          />
        ) : (
          <>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-gray-500 mb-2">
                <FaCloudArrowUp size={60} />
              </span>
              <p className="text-gray-700">
                Kéo và thả hoặc nhấp vào để tải lên
              </p>
            </div>
            <input
              type="file"
              accept=".jpg,.jpeg"
              className="absolute opacity-0 w-full h-full cursor-pointer"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
      {file && <p className="text-sm text-gray-600 mt-2">Tệp: {file.name}</p>}
      <p className="text-sm text-gray-500 mt-4">
        Bạn nên sử dụng tệp tin .jpg chất lượng cao có kích thước dưới 20MB
      </p>
    </div>
  );
};

export default UploadUploadPage;

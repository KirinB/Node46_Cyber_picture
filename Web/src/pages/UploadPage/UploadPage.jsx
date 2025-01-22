import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UploadUploadPage from "./components/Upload.UploadPage";
import FormUploadPage from "./components/Form.UploadPage";

const UploadPage = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  console.log(file);

  useEffect(() => {
    if (!user) {
      navigate(-1);
    }
  }, [user]);
  return (
    <div className="bg-slate-200 py-10">
      <div className="container min-h-[75vh] bg-white p-10 rounded-2xl grid grid-cols-2">
        <UploadUploadPage
          file={file}
          setFile={setFile}
          preview={preview}
          setPreview={setPreview}
        />
        <FormUploadPage file={file} setFile={setFile} setPreview={setPreview} />
      </div>
    </div>
  );
};

export default UploadPage;

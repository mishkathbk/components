import React, { useCallback, useState } from "react";
import Upload from "@/asset/svg/uploads/file-upload.svg";
import { useDropzone } from "react-dropzone";

type FilePreview = {
  url: string;
  type: string;
  name: string;
};

const DropzoneDownloadMultipleFile = () => {
  const [files, setFiles] = useState<FilePreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const maxSize = 2 * 1024 * 1024;

    acceptedFiles.forEach((file) => {
      if (file.size > maxSize) {
        alert(`"${file.name}" exceeds 2MB limit!`);
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setFiles((prev) =>
        prev.length < 4
          ? [...prev, { url: fileUrl, type: file.type, name: file.name }]
          : prev
      );
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "application/pdf": [],
    },
    maxSize: 2 * 1024 * 1024,
    maxFiles: 4 - files.length,
  });

  const handleUpload = () => {
    console.log("Uploading files:", files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <form>
      <div className="pt-[2rem] px-[1rem] md:px-[4rem] lg:px-[6rem]">
        <h1 className="mb-3 text-center text-[2rem] font-semibold text-accoreBlue">
          Upload Images / Download PDFs
        </h1>
        <p className="text-[0.8rem] md:text-[1rem] text-black py-[0.5rem] md:py-[1rem] text-center font-medium">
          MAX. 2MB • JPG / PNG / WEBP / PDF
        </p>

        {files.length < 4 && (
          <div className="flex flex-col justify-center gap-[0.5rem] px-[0.5rem] md:px-[2rem] lg:px-[4rem] pb-[0.5rem] md:pb-[2rem]">
            <div
              {...getRootProps()}
              className="w-full h-[15rem] bg-accoreBlue text-white rounded-md flex flex-col items-center justify-center relative cursor-pointer"
            >
              <input
                {...getInputProps()}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <img
                src={Upload}
                alt="upload-icon"
                className="size-[1.5rem] md:size-[2rem]"
              />
              <p className="font-medium text-[0.8rem] md:text-[1.3rem]">
                Drop Files or click here
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-[1rem] pb-[2rem]">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <div className="size-[10rem] bg-accoreBlue rounded-md flex items-center justify-center overflow-hidden relative">
                {file.type === "application/pdf" ? (
                  <a
                    href={file.url}
                    download={file.name}
                    className="text-white text-center font-semibold underline"
                  >
                    Download PDF
                  </a>
                ) : (
                  <img
                    src={file.url}
                    alt={`preview-${index}`}
                    className="object-contain w-full h-full"
                  />
                )}
                <span
                  className="absolute top-0 right-[0.3rem] rounded-full text-[1rem] p-0.5 text-white cursor-pointer "
                  onClick={() => removeFile(index)}
                >
                  ×
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="bg-white w-full rounded-sm py-[0.5rem] px-[0.5rem] text-accoreBlue border-2 border-accoreBlue font-semibold text-[1rem] cursor-pointer hover:bg-accoreBlue hover:text-white transition-all duration-300 ease-in-out"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default DropzoneDownloadMultipleFile;

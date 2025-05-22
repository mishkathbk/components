import React, { useCallback, useState } from "react";
import UploadWhite from "@/asset/svg/uploads/file-upload.svg";
import UploadBlue from "@/asset/svg/uploads/file-upload-blue.svg";
import Trash from "@/asset/svg/uploads/trash.svg";
import { useDropzone } from "react-dropzone";

const DropzoneSingleUpload = () => {
  const [images, setImages] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const maxSize = 2 * 1024 * 1024;

    acceptedFiles.forEach((file) => {
      if (file.size > maxSize) {
        alert(`"${file.name}" exceeds 2MB limit!`);
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImages(imageUrl);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxSize: 2 * 1024 * 1024,
  });

  const handleUpload = () => {
    console.log("Uploading images:", images);
  };

  const removeImage = () => {
    setImages(null);
  };

  return (
    <form>
      <div className="pt-[2rem] px-[1rem] md:px-[4rem] lg:px-[6rem]">
        <h1 className="mb-3 text-center text-[2rem] font-semibold text-accoreBlue">
          Single Upload Drop Zone
        </h1>
        <p className="text-[0.8rem] md:text-[1rem] text-black py-[0.5rem] md:py-[1rem] text-center font-medium">
          MAX. 2MB + ONLY JPEG / PNG / WEBP IMAGE TYPE
        </p>

        <div className="flex flex-col justify-center gap-[0.5rem] px-[0.5rem] md:px-[2rem] lg:px-[4rem] pb-[0.5rem] md:pb-[2rem]">
          <div
            {...getRootProps()}
            className="w-full h-[15rem] bg-accoreBlue overflow-hidden text-white rounded-md flex flex-col items-center justify-center relative cursor-pointer"
          >
            <input
              {...getInputProps()}
              className="absolute inset-0 w-full h-full opacity-1 cursor-pointer z-40 bg-amber-400"
            />
            {!images ? (
              <>
                <img
                  src={UploadWhite}
                  alt=""
                  className="size-[1.5rem] md:size-[2rem] cursor-pointer"
                />
                <p className="font-medium text-[0.8rem] md:text-[1.3rem]">
                  Drop Image or click here
                </p>
              </>
            ) : (
              <>
                <div className="bg-black/10 absolute inset-0 z-30"></div>
                <div className="flex gap-[1rem] justify-center w-fit z-50">
                  <img
                    src={UploadBlue}
                    alt=""
                    className="size-[1.5rem] md:size-[1.5rem] cursor-pointer z-50"
                  />
                  <img
                    src={Trash}
                    onClick={removeImage}
                    alt=""
                    className="size-[1.5rem] md:size-[1.5rem] cursor-cell z-[60] "
                  />
                </div>

                {images && (
                  <img
                    src={images}
                    alt="preview"
                    className="absolute  z-20 object-contain pointer-events-none"
                  />
                )}
              </>
            )}
          </div>
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

export default DropzoneSingleUpload;

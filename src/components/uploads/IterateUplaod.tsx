import React, { useState } from "react";
import Upload from "@/asset/svg/uploads/file-upload.svg";

const IterateUpload = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!file) return;

    // if (!allowedTypes.includes(file.type)) {
    //   alert("Only JPG, PNG, or WEBP files are allowed!");
    //   e.target.value = "";
    //   return;
    // }

    if (file.size > maxSize) {
      alert("File size should not exceed 2MB!");
      e.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImages((prev) => [...prev, imageUrl]);

    e.target.value = "";
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Uploading images:", images);
  };

  const removeImage = (index: number) => {
    setImages((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <form>
      <div className="pt-[2rem] px-[1rem] md:px-[4rem] lg:px-[6rem]">
        <h1 className="mb-3 text-center text-[2rem] font-semibold text-accoreBlue">
          Multiple image upload
        </h1>
        <p className=" text-[0.8rem] md:text-[1rem] text-black py-[0.5rem] md:py-[1rem] text-center font-medium">
          MAX. 2MB + ONLY JPEG / PNG / WEBP IMAGE TYPE
        </p>
        <div className=" ">
          <div className="flex flex-col justify-center  gap-[0.5rem] px-[0.5rem] md:px-[2rem] lg:px-[4rem] pb-[0.5rem] md:pb-[2rem]">
            {images.length < 4 && (
              <div className="w-full">
                <div className=" w-full h-[15rem] bg-accoreBlue text-white rounded-md flex flex-col items-center justify-center relative">
                  <img
                    src={Upload}
                    alt=""
                    className="size-[1.5rem] md:size-[2rem] cursor-pointer"
                  />
                  <p className="font-medium text-[0.8rem] md:text-[1.3rem]">
                    Drop Image or click here
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex pb-[2rem] gap-[2rem] ">
            {images.map((url, index) => (
              <div key={url} className="relative">
                <div className="size-[10rem] bg-accoreBlue rounded-md flex items-center">
                  <img
                    className=" object-contain "
                    src={url}
                    alt={`preview-${index}`}
                  />
                  <span
                    className="absolute top-0 right-[0.3rem]  rounded-full text-[1rem] p-0.5 text-white cursor-pointer"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="bg-white w-full rounded-sm py-[0.5rem]  px-[0.5rem] text-accoreBlue border-2 border-accoreBlue font-semibold text-[1rem] cursor-pointer hover:bg-accoreBlue hover:text-white transition-all duration-300 ease-in-out"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default IterateUpload;

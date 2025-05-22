import React, { useState } from "react";
import UploadWhite from "@/asset/svg/uploads/file-upload.svg";
import UploadBlue from "@/asset/svg/uploads/file-upload-blue.svg";
import Trash from "@/asset/svg/uploads/trash.svg";
import { cn } from "@/lib/utils";

const IterateUpload = () => {
  const [images, setImages] = useState<string | null>(null);

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
    setImages(imageUrl);

    e.target.value = "";
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Uploading image:", images);
  };

  const removeImage = () => {
    setImages(null);
  };

  return (
    <form>
      <div className="pt-[5rem] px-[1rem] md:px-[4rem] lg:px-[6rem]">
        <h1 className="mb-3 text-center text-[2rem] font-semibold text-accoreBlue">
          Single image upload
        </h1>
        <p className=" text-[0.8rem] md:text-[1rem] text-black py-[0.5rem] md:py-[1rem] text-center font-medium">
          MAX. 2MB + ONLY JPEG / PNG / WEBP IMAGE TYPE
        </p>
        <div className=" ">
          <div className="flex flex-col justify-center  gap-[0.5rem] px-[0.5rem] md:px-[2rem] lg:px-[4rem] pb-[0.5rem] md:pb-[2rem]">
            <div className="w-full">
              <div
                className={cn(
                  " w-full h-[15rem] overflow-hidden bg-accoreBlue text-white rounded-md flex flex-col items-center justify-center relative",{
                    "bg-accoreBlue text-white": !images,
                    "bg-black/10": images,
                  }
                )}
              >
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
                        className="size-[1.5rem] md:size-[1.5rem] cursor-pointer z-50"
                      />
                    </div>

                    <img
                      src={images!}
                      alt=""
                      className="absolute  z-20 object-contain cursor-pointer"
                    />
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-40"
                />
              </div>
            </div>
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

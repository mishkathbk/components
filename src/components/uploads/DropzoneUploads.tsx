import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaEye, FaTrashAlt, FaDownload } from "react-icons/fa";
import { Dialog, DialogOverlay, DialogTrigger } from "../ui/dialog";
import { PreviewModal } from "./PreviewModal";

type FilePreview = {
  name: string;
  url: string;
  type: string;
};

const DropzoneUploads = () => {
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  const [submittedFiles, setSubmittedFiles] = useState<FilePreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const maxSize = 2 * 1024 * 1024;
    acceptedFiles.forEach((file) => {
      if (file.size > maxSize) {
        alert(`"${file.name}" exceeds 2MB limit!`);
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviews((prev) =>
        prev.length < 4
          ? [...prev, { name: file.name, url, type: file.type }]
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
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    maxSize: 2 * 1024 * 1024,
  });

  const removePreview = (index: number) => {
    setPreviews((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const handleUpload = () => {
    setSubmittedFiles(previews);
    setPreviews([]);
  };

  return (
    <form className="p-6">
      <h2 className="text-xl font-semibold text-accoreBlue">Upload Document</h2>
      <div className="grid grid-cols-3 gap-[1rem]">
        <div
          className={cn("col-span-3", {
            "col-span-1": submittedFiles.length > 0,
          })}
        >
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-md p-6 min-h-[8rem] flex items-center justify-center mt-4 text-center cursor-pointer bg-gray-50 text-black "
          >
            <input {...getInputProps()} />
            <p className="text-sm">Click here to Upload</p>
          </div>
        </div>
        {submittedFiles.length > 0 && (
          <div className="overflow-x-auto col-span-2 p-4">
            <table className="min-w-full text-sm border rounded">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">File Name</th>
                  <th className="p-2 border">View</th>
                  <th className="p-2 border">Download</th>
                  <th className="p-2 border">Delete</th>
                </tr>
              </thead>
              <tbody>
                {submittedFiles.map((file, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border capitalize">
                      {file.type.includes("pdf")
                        ? "PDF"
                        : file.type.startsWith("image/")
                        ? "Image"
                        : "Word"}
                    </td>
                    <td className="p-2 border text-blue-600">{file.name}</td>
                    <td className="p-2 border text-center">
                      {file.type.includes("pdf") ||
                      file.type.startsWith("image/") ? (
                        <Dialog>
                          <DialogTrigger>
                            <FaEye className="text-gray-600 hover:text-blue-600 cursor-pointer" />
                          </DialogTrigger>
                          <DialogOverlay className="z-[22000] bg-black/50" />
                          <PreviewModal file={file} />
                        </Dialog>
                      ) : (
                        <a href={file.url} download={file.name}>
                          <FaEye className="text-gray-600 hover:text-blue-600 cursor-pointer" />
                        </a>
                      )}
                    </td>
                    <td className="p-2 border text-center">
                      <a href={file.url} download={file.name}>
                        <FaDownload className="text-gray-600 hover:text-green-600 cursor-pointer" />
                      </a>
                    </td>
                    <td className="p-2 border text-center">
                      <FaTrashAlt
                        onClick={() =>
                          setSubmittedFiles((prev) => [
                            ...prev.slice(0, index),
                            ...prev.slice(index + 1),
                          ])
                        }
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex gap-[1rem] flex-wrap col-span-3">
          {previews.map((file, index) => (
            <div
              key={index}
              className="flex flex-col w-fit items-center gap-2 mt-2"
            >
              {file.type.includes("pdf") ? (
                <iframe
                  src={file.url}
                  title={file.name}
                  className="size-32 border rounded shadow object-cover"
                />
              ) : file.type.startsWith("image/") ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="size-32 object-cover rounded shadow"
                />
              ) : (
                <p className="size-32 border rounded shadow object-cover text-center">
                  {file.name}
                </p>
              )}
              <FaTrashAlt
                onClick={() => removePreview(index)}
                className="text-red-600 hover:text-red-800 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleUpload}
        className="mt-4 w-fit px-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Upload Documents
      </button>
    </form>
  );
};

export default DropzoneUploads;

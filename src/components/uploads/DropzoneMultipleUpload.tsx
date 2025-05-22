import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaEye, FaTrashAlt, FaDownload } from "react-icons/fa";

type FilePreview = {
  name: string;
  url: string;
  type: string;
};

const DropzoneMultipleUpload = () => {
  const [files, setFiles] = useState<FilePreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const maxSize = 2 * 1024 * 1024;

    acceptedFiles.forEach((file) => {
      if (file.size > maxSize) {
        alert(`"${file.name}" exceeds 2MB limit!`);
        return;
      }

      const url = URL.createObjectURL(file);
      setFiles((prev) =>
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
    },
    maxSize: 2 * 1024 * 1024,
    maxFiles: 4 - files.length,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <form className="p-6 ">
      <h2 className="text-xl font-semibold text-gray-800">Upload Document</h2>
      <div className="grid grid-cols-3 gap-[0.5rem]">
        <div
          className={cn("mb-6 col-span-3", { "col-span-1": files.length > 0 })}
        >
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-md p-6 min-h-[8rem] flex items-center justify-center  mt-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <input {...getInputProps()} />
            <p className="text-sm text-gray-500">Click here to Upload</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="overflow-x-auto col-span-2 p-6">
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
                {files.map((file, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border capitalize">
                      {file.type.includes("pdf") ? "PDF" : "Image"}
                    </td>
                    <td className="p-2 border text-blue-600">{file.name}</td>
                    <td className="p-2 border text-center">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaEye className="text-gray-600 hover:text-blue-600 cursor-pointer" />
                      </a>
                    </td>
                    <td className="p-2 border text-center">
                      <a href={file.url} download={file.name}>
                        <FaDownload className="text-gray-600 hover:text-green-600 cursor-pointer" />
                      </a>
                    </td>
                    <td className="p-2 border text-center">
                      <FaTrashAlt
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => console.log("Uploading:", files)}
        className="mt-4 w-fit px-[1rem] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Upload Documents
      </button>
    </form>
  );
};

export default DropzoneMultipleUpload;

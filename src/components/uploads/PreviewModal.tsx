import {  DialogContent } from "@/components/ui/dialog";
import React from "react";

export function PreviewModal({
  file,
}: {
  file: { url: string; name: string; type: string };
}) {
  return (
    <DialogContent className="max-w-4xl w-full h-[80vh] overflow-hidden z-[22000]">
      <div className="h-full w-full flex justify-center items-center bg-white rounded-lg shadow">
        {file.type.includes("pdf") ? (
          <iframe src={file.url} title={file.name} className="w-full h-full" />
        ) : file.type.startsWith("image/") ? (
          <img
            src={file.url}
            alt={file.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <p className="text-center text-gray-800">
            Preview not available for this file type.
          </p>
        )}
      </div>
    </DialogContent>
  );
}

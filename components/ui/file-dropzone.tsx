import { ACCEPTED_FILE_TYPES, validateFile } from "@/lib/chat/validateFile";
import React, { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  onFileHover?: (isHovering: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onDrop, onFileHover, children, className = "" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragIn = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounter.current++;
      if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
        setIsDragging(true);
        onFileHover?.(true);
      }
    },
    [onFileHover]
  );

  const handleDragOut = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setIsDragging(false);
        onFileHover?.(false);
      }
    },
    [onFileHover]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      onFileHover?.(false);
      dragCounter.current = 0;
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        const allFiles = Array.from(event.dataTransfer.files);
        const validFiles = allFiles.filter((file) => {
          if (validateFile(file)) {
            return true;
          } else {
            toast.error(`${file.name} is not a valid file. Only ${ACCEPTED_FILE_TYPES.join(", ")} files are allowed.`);
            return false;
          }
        });
        if (validFiles.length > 0) {
          onDrop(validFiles);
        }
      }
    },
    [onDrop, onFileHover]
  );

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={className}
    >
      {children}
    </div>
  );
};

import { ACCEPTED_FILE_TYPES, validateFile } from "@/lib/chat/validateFile";
import { UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const SimpleFileUpload = ({ onChange }: { onChange?: (files: File[]) => void }) => {
  const [, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      if (validateFile(file)) {
        return true;
      } else {
        toast.error(`${file.name} is not a valid file. Only ${ACCEPTED_FILE_TYPES.join(", ")} files are allowed.`);
        return false;
      }
    });

    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      onChange && onChange(validFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES.join(",")}
        multiple
        onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        className="hidden"
      />
      <div
        onClick={handleClick}
        className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 mr-2 mb-2"
      >
        <UploadIcon height={16} width={16} />
      </div>
    </>
  );
};

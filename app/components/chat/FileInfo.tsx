import { FileText } from "lucide-react";
import { formatFileSize } from "@/lib/chat/format-files-utils";
import { Message } from "@prisma/client";

interface FileInfoProps {
  message: Message;
}

export function FileInfo({ message }: FileInfoProps) {
  if (!message.fileName) return null;

  return (
    <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
      <FileText className="w-4 h-4 mr-1" />
      <span>{message.fileName}</span>
      {message.fileSize && (
        <span className="ml-2">({formatFileSize(message.fileSize)})</span>
      )}
    </div>
  );
}

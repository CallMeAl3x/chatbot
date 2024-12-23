import React from "react";
import { User, MessageSquare } from "lucide-react";

interface MessageIconProps {
  isUser: boolean;
}

export const MessageIcon: React.FC<MessageIconProps> = ({ isUser }) => (
  <div className="flex gap-3">
    {isUser ? <User className="w-6 h-6 text-blue-600" /> : <MessageSquare className="w-6 h-6 text-gray-600" />}
  </div>
);

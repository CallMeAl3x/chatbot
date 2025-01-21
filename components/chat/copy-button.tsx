import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  isCopied: boolean;
  isDisabled: boolean;
  onClick: () => void;
  iconSize?: number;
  position?: "code" | "bottom-left" | "bottom-right"; // Add new positions
}

export const CopyButton: React.FC<CopyButtonProps> = ({ isCopied, isDisabled, onClick, position = "code", iconSize }) => {
  const iconColor = position === "bottom-left" || position === "bottom-right" ? "gray" : "currentColor";
  const size = iconSize || 20;

  return (
    <button
      className={`copybutton absolute ${
        position === "code"
          ? "top-2 right-2 bg-gray-800 hover:bg-gray-700"
          : position === "bottom-left"
          ? "top-full lg:left-0 right-0"
          : position === "bottom-right"
          ? "top-full right-0"
          : ""
      } z-10 p-1 rounded-full text-white transition-all duration-200`}
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Copy to clipboard"
    >
      {isCopied ? <Check size={size} color="black" /> : <Copy color={iconColor} size={size} />}
    </button>
  );
};

import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  isCopied: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export function CopyButton({ isCopied, isDisabled, onClick }: CopyButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        absolute top-2 right-2 z-10 p-1 rounded-full
        bg-gray-800 hover:bg-gray-700 text-white
        transition-all duration-200
      `}
    >
      <div className={`${isDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}>
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </div>
    </button>
  );
}

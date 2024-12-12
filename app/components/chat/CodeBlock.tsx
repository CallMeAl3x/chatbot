import { useCallback, useState } from "react";
import { Components } from "react-markdown";
import { toast } from "sonner";
import { CopyButton } from "./CopyButton";

export const CodeBlock: Components["code"] = ({ className, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const copyToClipboard = useCallback(async () => {
    if (isDisabled) return;

    // Ensure children is treated as a string
    const textToCopy = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";

    if (!textToCopy) {
      toast.error("Nothing to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setIsDisabled(true);
      toast.success("Copied to clipboard!");

      setTimeout(() => {
        setIsCopied(false);
        setIsDisabled(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy");
    }
  }, [children, isDisabled]);

  if (!className) {
    return (
      <code className="bg-slate-600 p-1 px-2 mx-0.5 rounded-lg text-white before:content-normal after:content-normal">
        {children}
      </code>
    );
  }

  return (
    <div className="prose prose-blue max-w-full relative">
      <CopyButton isCopied={isCopied} isDisabled={isDisabled} onClick={copyToClipboard} />
      <pre className={`${className} relative pr-6 whitespace-pre-wrap break-words m-0`}>
        <code className="break-words">{children}</code>
      </pre>
    </div>
  );
};

"use client";
import { Components } from "react-markdown";
import { CopyButton } from "./CopyButton";
import { useCopyToClipboard } from "@/lib/utils";

export const CodeBlock: Components["code"] = ({ className, children }) => {
  const { copyToClipboard, isCopied, isDisabled } = useCopyToClipboard();

  if (!className) {
    return (
      <code className="bg-slate-600 p-1 px-2 mx-0.5 rounded-lg text-white before:content-normal after:content-normal">
        {children}
      </code>
    );
  }

  return (
    <div className="prose prose-blue max-w-full relative">
      <CopyButton isCopied={isCopied} isDisabled={isDisabled} onClick={() => copyToClipboard(children)} position="code" />
      <pre className={`${className} relative pr-6 whitespace-pre-wrap m-0`}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

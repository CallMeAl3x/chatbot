"use client";
import { clsx, type ClassValue } from "clsx";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const copyToClipboard = useCallback(
    async (textToCopy: string) => {
      if (isDisabled) return;

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
    },
    [isDisabled]
  );

  return { copyToClipboard, isCopied, isDisabled };
}
